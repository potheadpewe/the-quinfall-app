import os
import json
import base64
import sqlite3
from pathlib import Path
import logging

# === Configuration ===
JSON_FILE_PATH = "item_kaynak_db.json"  # Your input JSON file
DB_PATH = "item_kaynak_db.db"           # SQLite database file
SQL_FILE_PATH = "create_hardcode_table_view.sql"  # SQL script to run
ICON_FOLDER = "./icon"        # Folder with icon images
TABLE_NAME_ICONS = "item_icons"
CHUNK_SIZE = 100
EXPORT_JSON_DIR = "json"      # Folder to export chunked JSON files

# === Setup Logging ===
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Step 1: Create DB if not exists ---
def create_database_if_not_exists(db_path):
    if not Path(db_path).exists():
        logger.info(f"Database not found. Creating new SQLite DB at '{db_path}'...")
        conn = sqlite3.connect(db_path)
        conn.close()
    else:
        logger.info(f"Database '{db_path}' already exists.")

# --- Step 2: JSON to SQLite ---
def infer_column_type(value):
    if value is None:
        return "TEXT"
    elif isinstance(value, bool):
        return "BOOLEAN"
    elif isinstance(value, int):
        return "INTEGER"
    elif isinstance(value, float):
        return "REAL"
    else:
        return "TEXT"

def create_table_schema(table_name, data_list):
    if not data_list:
        return None
    all_columns = set()
    column_types = {}
    for record in data_list:
        for key, value in record.items():
            all_columns.add(key)
            if key not in column_types and value is not None:
                column_types[key] = infer_column_type(value)
    for col in all_columns:
        if col not in column_types:
            column_types[col] = "TEXT"
    column_defs = [f'"{col}" {column_types[col]}' for col in sorted(all_columns)]
    schema = f'CREATE TABLE IF NOT EXISTS "{table_name}" (\n    ' + ',\n    '.join(column_defs) + '\n);'
    return schema, sorted(all_columns)

def insert_data(cursor, table_name, columns, data_list):
    if not data_list:
        return
    placeholders = ', '.join(['?' for _ in columns])
    columns_str = ", ".join([f'"{col}"' for col in columns])
    insert_sql = f'INSERT INTO "{table_name}" ({columns_str}) VALUES ({placeholders})'
    rows = []
    for record in data_list:
        row = []
        for col in columns:
            value = record.get(col)
            if value == "":
                value = None
            row.append(value)
        rows.append(row)
    cursor.executemany(insert_sql, rows)
    logger.info(f"Inserted {len(rows)} rows into {table_name}")

def convert_json_to_sqlite(json_file_path, db_file_path):
    try:
        logger.info(f"Reading JSON file: {json_file_path}")
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        conn = sqlite3.connect(db_file_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA foreign_keys = ON")
        for table_name, table_data in data.items():
            logger.info(f"Processing table: {table_name}")
            if not isinstance(table_data, list):
                logger.warning(f"Skipping {table_name} - not a list")
                continue
            if not table_data:
                logger.warning(f"Skipping {table_name} - empty list")
                continue
            result = create_table_schema(table_name, table_data)
            if result is None:
                continue
            schema, columns = result
            cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
            logger.info(f"Creating table: {table_name}")
            cursor.execute(schema)
            insert_data(cursor, table_name, columns, table_data)
        conn.commit()
        logger.info("Database creation completed successfully")
        # Print table stats
        print("\n" + "="*50)
        print("DATABASE STATISTICS")
        print("="*50)
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        for (table_name,) in tables:
            cursor.execute(f'SELECT COUNT(*) FROM "{table_name}"')
            count = cursor.fetchone()[0]
            print(f"{table_name:<30} {count:>10} rows")
        conn.close()
    except FileNotFoundError:
        logger.error(f"JSON file not found: {json_file_path}")
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON format: {e}")
    except sqlite3.Error as e:
        logger.error(f"SQLite error: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

# --- Step 3: Run SQL script ---
def run_sql_file(db_path, filepath):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    with open(filepath, 'r', encoding='utf-8') as f:
        sql_script = f.read()
        cursor.executescript(sql_script)
    print(f"✅ Executed {filepath}")
    conn.commit()
    conn.close()

# --- Step 4: Insert icons as base64 ---
def insert_icons_to_db(icon_folder, db_path, table_name):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            id TEXT PRIMARY KEY,
            icon TEXT NOT NULL
        )
    ''')
    IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico')
    for filename in os.listdir(icon_folder):
        if filename.lower().endswith(IMAGE_EXTENSIONS):
            file_id = os.path.splitext(filename)[0]
            filepath = os.path.join(icon_folder, filename)
            with open(filepath, 'rb') as image_file:
                encoded_bytes = base64.b64encode(image_file.read())
                base64_str = encoded_bytes.decode('utf-8')
                ext = filename.split('.')[-1].lower()
                mime_type = f'image/{ext if ext != "svg" else "svg+xml"}'
                data_uri = f'data:{mime_type};base64,{base64_str}'
                cursor.execute(f'''
                    INSERT OR REPLACE INTO {table_name} (id, icon)
                    VALUES (?, ?)
                ''', (file_id, data_uri))
                print(f'Inserted icon: {file_id}')
    conn.commit()
    conn.close()
    print('\n✅ All icons have been encoded and stored in the database.')

# --- Step 5: Process tables and export JSON chunks ---
def process_tablosu(tablosu_name, cursor):
    print(f"🔍 Processing: {tablosu_name}")
    top_level_items = []
    cursor.execute(f"PRAGMA table_info({tablosu_name})")
    table_columns = [row[1] for row in cursor.fetchall()]
    has_icon1 = 'icon1' in table_columns
    has_icon2 = 'icon2' in table_columns
    has_satis_kapal = 'satis_kapal' in table_columns
    if has_satis_kapal:
        cursor.execute(f"SELECT * FROM {tablosu_name} WHERE satis_kapal != 1")
    else:
        cursor.execute(f"SELECT * FROM {tablosu_name}")
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]

    for top_row in rows:
        top_data = dict(zip(col_names, top_row))
        item_id = top_data['id']

        icons = {}
        icon_ids = []
        icon1_id = top_data.get('icon1') if has_icon1 else None
        icon2_id = top_data.get('icon2') if has_icon2 else None

        if icon1_id:
            icon_ids.append(icon1_id)
        if icon2_id:
            icon_ids.append(icon2_id)

        if icon_ids:
            placeholders = ','.join('?' for _ in icon_ids)
            cursor.execute(f"SELECT id, icon FROM item_icons WHERE id IN ({placeholders})", icon_ids)
            icon_map = {row[0]: row[1] for row in cursor.fetchall()}
            icons = {
                'icon1': icon_map.get(icon1_id),
                'icon2': icon_map.get(icon2_id)
            }

        if has_icon1 or has_icon2:
            top_data['icons'] = icons

        cursor.execute("SELECT * FROM item_recipes WHERE craft_item_id = ?", (item_id,))
        recipe_rows = cursor.fetchall()
        recipe_colnames = [desc[0] for desc in cursor.description]
        recipes = []

        for recipe_row in recipe_rows:
            recipe_data = dict(zip(recipe_colnames, recipe_row))
            recipe_id = recipe_data.get('id') or f"recipe_{recipe_data['craft_item_id']}"
            recipe_data['id'] = recipe_id

            cursor.execute("SELECT * FROM recipe_requirement WHERE craft_item_id = ?", (recipe_data['craft_item_id'],))
            requirement_rows = cursor.fetchall()
            req_colnames = [desc[0] for desc in cursor.description]
            requirements = []

            for req_row in requirement_rows:
                req_data = dict(zip(req_colnames, req_row))
                material_id = req_data.get('material_id')
                material_data = None
                if material_id:
                    cursor.execute("SELECT * FROM material_tablosu WHERE id = ?", (material_id,))
                    material_row = cursor.fetchone()
                    if material_row:
                        mat_colnames = [desc[0] for desc in cursor.description]
                        material_data = dict(zip(mat_colnames, material_row))
                        mat_icon_id = material_data.get('icon1')
                        mat_icon = None
                        if mat_icon_id:
                            cursor.execute("SELECT icon FROM item_icons WHERE id = ?", (mat_icon_id,))
                            icon_row = cursor.fetchone()
                            if icon_row:
                                mat_icon = icon_row[0]
                        material_data['icon'] = mat_icon
                req_data['material'] = material_data
                requirements.append(req_data)

            recipe_data['requirements'] = requirements
            recipes.append(recipe_data)

        top_data['recipes'] = recipes
        top_level_items.append(top_data)

    return top_level_items

def fetch_flat_table(table_name, cursor):
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    return [dict(zip(col_names, row)) for row in rows]

def export_chunked_json(name, data):
    total = len(data)
    if total == 0:
        print(f"⚠️ Skipping {name} — no records found.")
        return

    os.makedirs(EXPORT_JSON_DIR, exist_ok=True)

    if total <= CHUNK_SIZE:
        filename = os.path.join(EXPORT_JSON_DIR, f"{name}_data.json")
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"✅ Exported {filename} ({total} records)")
    else:
        chunks = (total + CHUNK_SIZE - 1) // CHUNK_SIZE
        for i in range(chunks):
            chunk_data = data[i * CHUNK_SIZE: (i + 1) * CHUNK_SIZE]
            filename = os.path.join(EXPORT_JSON_DIR, f"{name}_data{i + 1}.json")
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(chunk_data, f, indent=2, ensure_ascii=False)
            print(f"✅ Exported {filename} ({len(chunk_data)} records)")

def run_data_processing_exports():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    all_data = {
        'items': process_tablosu('item_tablosu', cursor),
        'materials': process_tablosu('material_tablosu', cursor),
        'props': process_tablosu('prop_tablosu', cursor),
        'languages': fetch_flat_table('language_table', cursor),
        'professions': fetch_flat_table('profession_table', cursor)
    }

    for name, data in all_data.items():
        export_chunked_json(name, data)

    conn.close()
    print("\n✅ Export completed for all data files.")

# === MAIN ===
if __name__ == "__main__":
    print("Starting JSON to SQLite processing pipeline...\n")

    # Step 1: Create DB if needed
    create_database_if_not_exists(DB_PATH)

    # Step 2: Convert JSON to SQLite
    if not Path(JSON_FILE_PATH).exists():
        print(f"Error: JSON file '{JSON_FILE_PATH}' not found!")
    else:
        convert_json_to_sqlite(JSON_FILE_PATH, DB_PATH)

        # Step 3: Run SQL file
        if Path(SQL_FILE_PATH).exists():
            run_sql_file(DB_PATH, SQL_FILE_PATH)
        else:
            print(f"Warning: SQL file '{SQL_FILE_PATH}' not found. Skipping SQL script execution.")

        # Step 4: Insert icons
        if Path(ICON_FOLDER).exists():
            insert_icons_to_db(ICON_FOLDER, DB_PATH, TABLE_NAME_ICONS)
        else:
            print(f"Warning: Icon folder '{ICON_FOLDER}' not found. Skipping icon insertion.")

        # Step 5: Process data and export chunked JSON files into 'json/' folder
        run_data_processing_exports()

    print("\nAll steps completed.")
