import { Material } from "./material";

export interface Requirements {
    craft_item_id: string;
    craft_recipe_no: number;
    material_id: string;
    quantity: string;
    material: Material;
    [key: string]: any;
}