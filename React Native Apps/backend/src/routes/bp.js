import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/ndaysBloodPressure/:name", async (req, res) => {
    console.log("details calling", req.params)
    const name = req.params?.name;
    try{
        const [avg, details] = await fetchingDataBasedonLastNdays(name, 5)
        details.sort((a, b) => a.date - b.date)
        console.log('avg', avg, 'details', details)
        return res.status(200).json({ message: true , 'last5Days': details, 'avg': avg});
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({message: "Something went wrong"})
    }
})

export default router;

const fetchingDataBasedonLastNdays = async (name, ndays) => {
    if (ndays != 1) {
        console.log('jkefkejkfjenjfknejkfnjenfk', ndays)
        const dateNdaysAgo = new Date();
        dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays+1);
        dateNdaysAgo.setMonth(dateNdaysAgo.getMonth() - 1);
        console.log('dateNdaysAgo', dateNdaysAgo)
        const result = await NewMeasurement.find({ "name": name, date: { $gte: dateNdaysAgo } });
        console.log('final...', result)
        const avgeData = fetchAverageOfTheBP(result)
        return avgeData;
    } else if (ndays == 1) {
        const result = await NewMeasurement.find({ "name": name});
        const avgeData = fetchAverageOfTheBP(result)
        return avgeData;
    }
}
const fetchAverageOfTheBP = (data) => {
    let sysAvg = 0;
    let diaAvg = 0;
    let details = []
    console.log("dtt..", data)
    if (data && data?.length > 0) {
        for(let i = 0; i< data.length; i++ ) {
            sysAvg= sysAvg + parseInt(data[i]['systolic'])
            diaAvg = diaAvg + parseInt(data[i]["diastolic"])
            details.push({"date": data[i]["date"], 'diastolic':data[i]["diastolic"], 'systolic': data[i]["systolic"], 'weight': data[i]["weight"], 'pulse': data[i]["pulse"]})
        }
    }
    console.log("avg,.", sysAvg, diaAvg)
    return [Math.ceil(sysAvg).toString() +'/' + Math.ceil(diaAvg).toString(), details];
}
