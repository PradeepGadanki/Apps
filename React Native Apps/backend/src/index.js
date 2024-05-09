import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from "./routes/users.js";
import newMeasurement from './routes/newmeasurement.js'
import login from './routes/login.js'
import avgBloodPressure from './routes/bloodpressureValues.js'
import avgPulse from './routes/pulse.js'
import avgWeight from './routes/weight.js'
import last5DaysBP from './routes/bp.js'
import allData from './routes/bpTrend.js'
import goal from './routes/goal.js';
import fetchGoalDetails from './routes/fetchGoalDetails.js';
import EatenFood from './routes/EatenFood.js';
import fetchEatenFoodDetails from './routes/fetchEatenFood.js';
//import isActive from './routes/activityStatus.js;'
import predictBpValues from './routes/predictBP.js'

console.log("entered")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/users", router)
app.use("/api/users", newMeasurement)
app.use("/api/users", login)
app.use("/api/users", avgBloodPressure)
app.use("/api/users", avgPulse)
app.use("/api/users", avgWeight)
app.use("/api/users", last5DaysBP)
app.use("/api/users", allData)
app.use("/api/users", goal)
app.use("/api/users", fetchGoalDetails)
app.use("/api/users", EatenFood)
app.use("/api/users", fetchEatenFoodDetails)
//app.use("/api/users", isActive)
app.use("/api/users", predictBpValues)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then( ()=>{
    console.log('database connected successfully')
    app.listen(7000, ()=> {
        console.log("Server running on localhost: 7000");
    })
})