import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/avgWeight/:name", async (req, res) => {
    console.log("details calling", req.params?.name)
    const name = req.params?.name;
    try{
        const last7Days = await fetchingDataBasedonLastNdays(name, 15)
        const last14Days = await fetchingDataBasedonLastNdays(name, 30)
        const last30Days = await fetchingDataBasedonLastNdays(name, 60)
        const last90Days = await fetchingDataBasedonLastNdays(name, 90)
        const lastAllDays = await fetchingDataBasedonLastNdays(name, 1)
        return res.status(200).json({ message: true , 'last7Days': last7Days, "last14Days": last14Days, "last30Days": last30Days, "last90Days": last90Days, 'lastAllDays': lastAllDays});
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
    console.log('data in weight ', data)
    let avgWeight = 0;
    if (data && data?.length > 0) {
        for(let i = 0; i< data.length; i++ ) {
            avgWeight= avgWeight + parseInt(data[i]['weight'])
        }
    }
    avgWeight = avgWeight/data?.length
    console.log("avg,.", avgWeight)
    return Math.ceil(avgWeight);
}
