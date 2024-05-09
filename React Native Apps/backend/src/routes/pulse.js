import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/avgPulse/:name", async (req, res) => {
    console.log("details calling", req.params?.name)
    const name = req.params?.name;
    try{
        const last7Days = await fetchingDataBasedonLastNdays(name, 7)
        const last14Days = await fetchingDataBasedonLastNdays(name, 14)
        const last30Days = await fetchingDataBasedonLastNdays(name, 30)
        const last90Days = await fetchingDataBasedonLastNdays(name, 90)
        const lastAllDays = await fetchingDataBasedonLastNdays(name, 1)
        console.log("last7Days pulse,..", last7Days)
        return res.status(200).json({ message: true , 'last7Days': last7Days, "last14Days": last14Days, "last30Days": last30Days, "last90Days": last90Days, 'lastAllDays': lastAllDays});
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({message: "Something went wrong"})
    }
    console.log('done')
})

export default router;

// const fetchingDataBasedonLastNdays = async (name, ndays) => {
//     if (ndays != 1) {
//         const dateNdaysAgo = new Date();
//         dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays);
//         dateNdaysAgo.setMonth(dateNdaysAgo.getMonth() - 1);
//         console.log('dateNdaysAgo checking', dateNdaysAgo)
//         const result = await NewMeasurement.find({ "name": name, date: { $gte: dateNdaysAgo } });
//         if (ndays == 7) {
//             console.log('7 days...', result);
//         }
//         const avgeData = fetchAverageOfTheBP(result);
//         if (ndays == 7) {
//             console.log('7 days... final ', avgeData);
//         }
//         return avgeData;
//     } else if (ndays == 1) {
//         const result = await NewMeasurement.find({ "name": name});
//         const avgeData = fetchAverageOfTheBP(result)
//         return avgeData;
//     }
// }

const fetchingDataBasedonLastNdays = async (name, ndays) => {
    if (ndays != 1) {
        const dateNdaysAgo = new Date();
        dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays);
        dateNdaysAgo.setMonth(dateNdaysAgo.getMonth() - 1);
        console.log('dateNdaysAgo checking', dateNdaysAgo);
         const result = await NewMeasurement.find({ "name": name, date: { $gte: dateNdaysAgo }});
        //result = result.find(date: { $gte: dateNdaysAgo })
        console.log('Result:', result);
        const avgeData = fetchAverageOfTheBP(result);
        console.log('Average Data:', avgeData);
        return avgeData;
    } else if (ndays == 1) {
        const result = await NewMeasurement.find({ "name": name});
        const avgeData = fetchAverageOfTheBP(result);
        console.log('Average Data:', avgeData);
        return avgeData;
    }
}
const fetchAverageOfTheBP = (data) => {
    let avgPulse = 0;
    console.log("dtt..", data)
    if (data && data?.length > 0) {
        for(let i = 0; i< data.length; i++ ) {
            avgPulse= avgPulse + parseInt(data[i]['pulse'])
        }
    }
    avgPulse = avgPulse/data?.length
    console.log("avg,. in pulse..", avgPulse)
    return Math.ceil(avgPulse);
}
