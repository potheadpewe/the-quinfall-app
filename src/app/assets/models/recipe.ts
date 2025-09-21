import { Requirements } from "./requirements";

export interface Recipe {
    craft_item_id: string;
    craft_recipe_no: number;
    material_name: string;
    profession_no: number;
    profession_level: number;
    exp: number;
    tier: number;
    time: number;
    type: string;
    id: string;
    requirements: Requirements[];
    [key: string]: any;
}