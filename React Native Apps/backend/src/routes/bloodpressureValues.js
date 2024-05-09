import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.get("/avgBloodPressure/:name", async (req, res) => {
    console.log("details calling", req.params?.name)
    const name = req.params?.name;
    try{
        const last7Days = await fetchingDataBasedonLastNdays(name, 7)
        const last14Days = await fetchingDataBasedonLastNdays(name, 14)
        const last30Days = await fetchingDataBasedonLastNdays(name, 30)
        const last90Days = await fetchingDataBasedonLastNdays(name, 90)
        const lastAllDays = await fetchingDataBasedonLastNdays(name, 1)
        return res.status(200).json({ message: true , 'last7Days': last7Days, "last14Days": last14Days, "last30Days": last30Days, "last90Days": last90Days, 'lastAllDays': lastAllDays});
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({message: "Something went wrong"})
    }
    console.log('done')
})

export default router;

const fetchingDataBasedonLastNdays = async (name, ndays) => {
    if (ndays != 1) {
        const dateNdaysAgo = new Date();
        dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays);
        dateNdaysAgo.setMonth(dateNdaysAgo.getMonth() - 1);
        const result = await NewMeasurement.find({ "name": name, date: { $gte: dateNdaysAgo } });
        const avgeData = fetchAverageOfTheBP(result, ndays)
        return avgeData;
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

// Function to fetch data for the last N days
// async function fetchDataForLastNDays(days) {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
//     try {
//         await client.connect();

//         const db = client.db();
//         const collection = db.collection('your_collection_name');

//         // Calculate the date N days ago
//         const dateNdaysAgo = new Date();
//         dateNdaysAgo.setDate(dateNdaysAgo.getDate() - days);

//         // Construct the query to fetch data for the last N days
//         const query = { timestamp: { $gte: dateNdaysAgo } };
//         const result = await collection.find(query).toArray();

//         return result;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// // Usage example: Fetch data for the last 7 days
// fetchDataForLastNDays(7)
//     .then(data => {
//         console.log('Data for the last 7 days:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// // Usage example: Fetch data for the last 14 days
// fetchDataForLastNDays(14)
//     .then(data => {
//         console.log('Data for the last 14 days:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
