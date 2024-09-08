import { Step } from "../screens/AddRecipe";

export interface Recipe {
    name: string,
    brewer: string,
    grinder: string,
    clicks: number,
    temperature: number,
    waterAmount: number, 
    coffeeAmount: number, 
    coffeeRatio: number,
    steps: Step[]
}