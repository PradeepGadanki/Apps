import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/allBpData/:name", async (req, res) => {
    console.log("details calling..", req.params)
    const name = req.params?.name
    try{
        const details = await fetchingDataBasedonLastNdays(name, 1)
        console.log('details', details)
        details.sort((a, b) => a.date - b.date)
        return res.status(200).json({ message: true , 'allData': details});
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({message: "Something went wrong"})
    }
})

export default router;

const fetchingDataBasedonLastNdays = async (name, ndays) => {
    if (ndays != 1) {
        const dateNdaysAgo = new Date();
        dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays);
        dateNdaysAgo.setMonth(dateNdaysAgo.getMonth() - 1);
        const result = await NewMeasurement.find({ "name": name, date: { $gte: dateNdaysAgo } });
        const avgeData = fetchAverageOfTheBP(result)
        return avgeData;
    } else if (ndays == 1) {
        const result = await NewMeasurement.find({ "name": name});
        const avgeData = fetchAverageOfTheBP(result)
        return avgeData;
    }
}
const fetchAverageOfTheBP = (data) => {
    let details = []
    console.log("dtt..", data)
    if (data && data?.length > 0) {
        for(let i = 0; i< data.length; i++ ) {
            details.push({"date": data[i]["date"], 'diastolic':data[i]["diastolic"], 'systolic': data[i]["systolic"], 'weight': data[i]["weight"], 'pulse': data[i]["pulse"]})
        }
    }
    console.log("adetailsvg,.", details)
    return details;
}
