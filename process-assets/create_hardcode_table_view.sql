/*
	DROP AND RECREATE TABLES
*/
DROP TABLE IF EXISTS language_table;

CREATE TABLE language_table (
    description TEXT NOT NULL,
    short       TEXT
)
;

INSERT INTO language_table (description, short)
VALUES
	('Chinese', 'ZH'),
	('English', 'EN'),
	('French', 'FR'),
	('German', 'DE'),
	('Italian', 'IT'),
	('Japanese', 'JA'),
	('Korean', 'KO'),
	('Polish', 'PL'),
	('Portuguese', 'PT'),
	('Russian', 'RU'),
	('Spanish', 'ES'),
	('Turkish', 'TR'),
	('Ukrainian', 'UK')
;

DROP TABLE IF EXISTS profession_table;

CREATE TABLE profession_table (
    id                    INTEGER NOT NULL,
    baslik_loc_Chinese    TEXT,
    baslik_loc_English    TEXT,
    baslik_loc_French     TEXT,
    baslik_loc_German     TEXT,
    baslik_loc_Italian    TEXT,
    baslik_loc_Japanese   TEXT,
    baslik_loc_Korean     TEXT,
    baslik_loc_Polish     TEXT,
    baslik_loc_Portuguese TEXT,
    baslik_loc_Russian    TEXT,
    baslik_loc_Spanish    TEXT,
    baslik_loc_Turkish    TEXT,
    baslik_loc_Ukrainian  TEXT
);

INSERT INTO profession_table (id, baslik_loc_Chinese, baslik_loc_English, baslik_loc_French, baslik_loc_German, baslik_loc_Italian, baslik_loc_Japanese, baslik_loc_Korean, baslik_loc_Polish, baslik_loc_Portuguese, baslik_loc_Russian, baslik_loc_Spanish, baslik_loc_Turkish, baslik_loc_Ukrainian)
VALUES
	(1, '烹饪', 'Cooking', 'Cuisson', 'Kochen', 'Cucina', '料理', '요리', 'Gotowanie', 'Cozinhar', 'Приготовление пищи', 'Cocinando', 'Yemek pişirmek', 'Кулінарія'),
	(2, '炼金术', 'Alchemy', 'Alchimie', 'Alchimie', 'Alchimia', '錬金術', '연금술', 'Alchemia', 'Alquimia', 'Алхимия', 'Alquimia', 'Simya', 'Алхімія'),
	(3, '铁匠', 'Blacksmith', 'Forgeron', 'Schmied', 'Fabbro', '鍛冶屋', '대장장이', 'Kowal', 'Ferreiro', 'Кузнец', 'Herrero', 'Demirci', 'Коваль'),
	(4, '裁缝', 'Tailor', 'Tailleur', 'Schneider', 'Sarto', '仕立て屋', '재단사', 'Krawiec', 'Alfaiate', 'Портной', 'Sastre', 'Terzi', 'Кравець'),
	(5, '木匠', 'Carpenter', 'Menuisier', 'Tischler', 'Falegname', '大工', '목수', 'Stolarz', 'Carpinteiro', 'Плотник', 'Carpintero', 'Marangoz', 'Тесляр'),
	(6, '工程', 'Engineering', 'Ingénierie', 'Maschinenbau', 'Ingegneria', 'エンジニアリング', '공학', 'Inżynieria', 'Engenharia', 'Инженерное дело', 'Ingeniería', 'Mühendislik', 'Інженерія'),
	(7, '珠宝制作', 'Jewel Crafting', 'Fabrication de bijoux', 'Juwelenherstellung', 'Creazione di gioielli', '宝石細工', '보석 제작', 'Rzemiosło jubilerskie', 'Criação de joias', 'Изготовление ювелирных изделий', 'Elaboración de joyas', 'Mücevher İşçiliği', 'Виготовлення коштовностей'),
	(20, '木工', 'Woodcrafter', 'Artisan du bois', 'Holzhandwerker', 'Artigiano del legno', '木工職人', '목공예가', 'Stolarz', 'Marceneiro', 'Мастер по дереву', 'Carpintero', 'Ahşap işçisi', 'Тесляр'),
	(21, '冶炼', 'Smelting', 'Fonte', 'Schmelzen', 'Fusione', '製錬', '제련', 'Wytapianie', 'Fundição', 'Плавка', 'Fundición', 'Eritme', 'Плавка'),
	(22, '皮革工匠', 'Leatherworker', 'Travailleur du cuir', 'Lederarbeiter', 'Lavoratore della pelle', '革職人', '가죽세공인', 'Skórzany', 'Marceneiro', 'Кожевник', 'Trabajador del cuero', 'Deri işçisi', 'Шкірянин'),
	(23, '主题查看器', 'Thread Viewer', 'Visionneuse de fils de discussion', 'Thread-Betrachter', 'Visualizzatore di thread', 'スレッドビューア', '스레드 뷰어', 'Przeglądarka wątków', 'Visualizador de tópicos', 'Просмотрщик потоков', 'Visor de hilos', 'Konu Görüntüleyici', 'Переглядач тем'),
	(24, '宝石切割', 'Gem Cutting', 'Taille de pierres précieuses', 'Edelsteinschleifen', 'Taglio delle gemme', '宝石のカッティング', '보석 절단', 'Szlifowanie klejnotów', 'Lapidação de gemas', 'Огранка драгоценных камней', 'Talla de gemas', 'Mücevher Kesimi', 'Огранювання дорогоцінного каміння'),
	(25, '精粹提炼', 'Essence Refining', 'Raffinage de l''essence', 'Essenzverfeinerung', 'Raffinazione dell''essenza', 'エッセンス精製', '에센스 리파이닝', 'Rafinacja Esencji', 'Refinamento de Essência', 'Очищение эссенции', 'Refinación de esencia', 'Öz Arıtma', 'Удосконалення сутності'),
	(26, '渔业/畜牧业', 'Fishing / Husbandry', 'Pêche / Élevage', 'Angeln / Tierhaltung', 'Pesca / Allevamento', '漁業・畜産', '어업 / 축산', 'Rybołówstwo / Hodowla', 'Pesca / Pecuária', 'Рыболовство / Животноводство', 'Pesca / Ganadería', 'Balıkçılık / Hayvancılık', 'Рибальство / Тваринництво'),
	(27, '石材切割', 'Stone Cutting', 'Taille de pierre', 'Steinschneiden', 'Taglio della pietra', '石切り', '석재 절단', 'Cięcie kamienia', 'Corte de pedras', 'Резка камня', 'Corte de piedra', 'Taş Kesme', 'Різання каменю'),
	(100, '建筑工人', 'Construction Worker', 'Ouvrier du bâtiment', 'Bauarbeiter', 'operaio edile', '建設作業員', '건설 노동자', 'Pracownik budowlany', 'Trabalhador da construção civil', 'Строитель', 'Trabajador de la construcción', 'İnşaat İşçisi', 'Будівельник')
;

/*
	DROP AND RECREATE VIEWS
*/
DROP VIEW IF EXISTS item_recipes;

CREATE VIEW item_recipes AS
select 
    substr(c.item_id, 1, instr(c.item_id, '_') - 1) as craft_item_id,
    m.baslik_loc_english as material_name,
    c.meslek_no as profession_no,
    c.min_meslek_level as profession_level,
    c.exp,
    c.tier,
    c.time,
    'material' type
from craft_tablosu c
join material_tablosu m on m.id=substr(c.item_id, 1, instr(c.item_id, '_') - 1)
union all
select 
    substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) as craft_item_id,
    m.baslik_loc_english as material_name,
    c.meslek_no as profession_no,
    c.min_meslek_level as profession_level,
    c.exp,
    c.tier,
    c.time,
    'item' type
from craft_tablosu c
join item_tablosu m on m.id=substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1)
union all
select 
    substr(c.item_id, 1, instr(c.item_id, '_') - 1) as craft_item_id,
    m.baslik_loc_english as material_name,
    c.meslek_no as profession_no,
    c.min_meslek_level as profession_level,
    c.exp,
    c.tier,
    c.time,
    'prop' type
from craft_tablosu c
join prop_tablosu m on m.id=substr(c.item_id, 1, instr(c.item_id, '_') - 1)
;

DROP VIEW IF EXISTS recipe_requirement;

CREATE VIEW recipe_requirement AS
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_1, 1, instr(malzeme_1, '_') - 1) as material_id,
    substr(malzeme_1, instr(malzeme_1, '_') + 1) as quantity
from craft_tablosu
where malzeme_1 is not null and malzeme_1 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_2, 1, instr(malzeme_2, '_') - 1) as material_id,
    substr(malzeme_2, instr(malzeme_2, '_') + 1) as quantity
from craft_tablosu
where malzeme_2 is not null and malzeme_2 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_3, 1, instr(malzeme_3, '_') - 1) as material_id,
    substr(malzeme_3, instr(malzeme_3, '_') + 1) as quantity
from craft_tablosu
where malzeme_3 is not null and malzeme_3 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_4, 1, instr(malzeme_4, '_') - 1) as material_id,
    substr(malzeme_4, instr(malzeme_4, '_') + 1) as quantity
from craft_tablosu
where malzeme_4 is not null and malzeme_4 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_5, 1, instr(malzeme_5, '_') - 1) as material_id,
    substr(malzeme_5, instr(malzeme_5, '_') + 1) as quantity
from craft_tablosu
where malzeme_5 is not null and malzeme_5 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_6, 1, instr(malzeme_6, '_') - 1) as material_id,
    substr(malzeme_6, instr(malzeme_6, '_') + 1) as quantity
from craft_tablosu
where malzeme_6 is not null and malzeme_6 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_7, 1, instr(malzeme_7, '_') - 1) as material_id,
    substr(malzeme_7, instr(malzeme_7, '_') + 1) as quantity
from craft_tablosu
where malzeme_7 is not null and malzeme_7 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_8, 1, instr(malzeme_8, '_') - 1) as material_id,
    substr(malzeme_8, instr(malzeme_8, '_') + 1) as quantity
from craft_tablosu
where malzeme_8 is not null and malzeme_8 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_9, 1, instr(malzeme_9, '_') - 1) as material_id,
    substr(malzeme_9, instr(malzeme_9, '_') + 1) as quantity
from craft_tablosu
where malzeme_9 is not null and malzeme_9 != ''
union all
select 
    case when length(substr(item_id, 1, instr(item_id, '_') - 1)) > 1 then substr(item_id, 1, instr(item_id, '_') - 1) else substr(item_id, 1, instr(item_id, '_') + instr(substr(item_id, instr(item_id, '_') + 1), '_') - 1) end as craft_item_id,
    substr(malzeme_10, 1, instr(malzeme_10, '_') - 1) as material_id,
    substr(malzeme_10, instr(malzeme_10, '_') + 1) as quantity
from craft_tablosu
where malzeme_10 is not null and malzeme_10 != ''
;
