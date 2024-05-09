import EatenFood from '../models/EatenFood.js'
import express from 'express';

const router = express.Router();

router.get("/eatenFoodDetails/:name/:date", async (req, res) => {
    console.log("details calling in eaten food", req.params)
    try{
        console.log('in eaten food')
        let date = new Date(req.params.date);
        date = date.getFullYear()+'/'+date.getMonth() + '/'+ date.getDate()
        let goalDetails = await EatenFood.find({"name": req.params.name})
        if (goalDetails) {
            let arr = [];
            for (let i=0; i<goalDetails.length; i++) {
                let tempDate = goalDetails[i]['date'].getFullYear()+'/'+goalDetails[i]['date'].getMonth() + '/'+ goalDetails[i]['date'].getDate()
                if (tempDate == date) {
                    arr.push(goalDetails[i])
                }
            }
            return res.status(200).json({'message': 'successufully fetched', 'data': arr }) 

        }
        console.log('goalDetails',goalDetails)
        return res.status(200).json({'message': 'No details found', 'data': [] })
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message: "Something went wrong"})
    }
    console.log('done')
})

export default router;