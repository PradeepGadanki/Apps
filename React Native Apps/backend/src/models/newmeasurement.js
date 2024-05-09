import mongoose from "mongoose";

const newMeasurementSchema = new mongoose.Schema({
    name: {type: String, required: true},
    systolic: {type: String, required: true},
    diastolic: {type: String, required: true},
    pulse: {type: String, required: true},
    weight: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    food: {type: String, required: true},
    bloodPressure: {type: Number, required: true}
})

const NewMeasurementSchema = mongoose.model("NewMeasurementSchema", newMeasurementSchema);
export default NewMeasurementSchema;