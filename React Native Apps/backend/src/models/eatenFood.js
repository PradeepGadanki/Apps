import mongoose from "mongoose";

const eatenFood = new mongoose.Schema({
    food: {type: String, required: true},
    carbohydrates: {type: String, required: true},
    fat: {type: String, required: true},
    protein: {type: String, required: true},
    date: {type: Date, required: true},
    name: {type: String, required: true},
    foodType: {type: String, required: true}
})

const EatenFood = mongoose.model("EatenFood", eatenFood);
export default EatenFood;