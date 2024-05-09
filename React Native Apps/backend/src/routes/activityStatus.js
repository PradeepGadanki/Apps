import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/activityStatus/:name", async (req, res) => {
    console.log("details calling", req.params?.name)
    const name = req.params?.name;
    try{
        const last2Days = await fetchingDataBasedonLastNdays(name, 2)
        return res.status(200).json({ message: true , 'last2Days': last2Days, "isActiveFrom2Days": last2Days.length>=1? true: false });
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
        return result
        //const avgeData = fetchAverageOfTheBP(result, ndays)
        //return avgeData;
    } else if (ndays == 1) {
        const result = await NewMeasurement.find({ "name": name});
        const avgeData = fetchAverageOfTheBP(result, ndays)
        return avgeData;
    }
}
const fetchAverageOfTheBP = (data, ndays) => {
    let sysAvg = 0;
    let diaAvg = 0;
    console.log("dtt..", data)
    if (data && data?.length > 0) {
        for(let i = 0; i< data.length; i++ ) {
            sysAvg= sysAvg + parseInt(data[i]['systolic'])
            diaAvg = diaAvg + parseInt(data[i]["diastolic"])
        }
    }
    sysAvg = sysAvg/data?.length
    diaAvg = diaAvg/data?.length
    console.log("avg,.", sysAvg, diaAvg)
    return Math.ceil(sysAvg).toString() +'/' + Math.ceil(diaAvg).toString();
}