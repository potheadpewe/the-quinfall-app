import { Material } from "./material";

export interface Requirements {
    craft_item_id: string;
    material_id: string;
    quantity: string;
    material: Material;
    [key: string]: any;
}