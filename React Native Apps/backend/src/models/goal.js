import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    carbohydrates: {type: String, required: true},
    fat: {type: String, required: true},
    protein: {type: String, required: true},
    date: {type: Date, required: true},
    name: {type: String, required: true}
})

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;