import express from 'express';
import NewMeasurement from '../models/newmeasurement.js';

const router = express.Router();

router.post("/newmeasurement/", async (req, res) => {
    console.log("details calling", req.body.name)
    try {
        let user = await NewMeasurement.find({ name: req.body.name })
        let bp = (2 * (parseInt(req.body.diastolic)) + (parseInt(req.body.systolic))) / 3
        console.log("bppp-user.", bp, 'user', user)

        let data = req.body;
        data["bloodPressure"] = bp
        data["systolic"] = req.body.systolic
        data['diastolic'] = req.body.diastolic
        if (!user) {
            console.log("Bp value", bp)
            const details = new NewMeasurement(data)
            await details.save()
            console.log("user details posted successfully")
            return res.status(200).json({ message: 'User details posted successfully', name: req.name })
        } else {
            console.log("in else", user?.date, 'user det', user);
            //let userDate = user?.date?.getMonth() + 1 + '/' + user?.date?.getDate() + '/' + user?.date?.getFullYear();
            //if ()
            for (let i = 0; i < user.length; i++) {
                console.log('in for length', user.length)
                let userDate = user?.[i]?.date?.getMonth() + 1 + '/' + user?.[i]?.date?.getDate() + '/' + user?.[i]?.date?.getFullYear();
                let requestedData = new Date(req.body.date);
                requestedData = requestedData.getMonth() + 1 + '/' + requestedData.getDate() + '/' + requestedData?.getFullYear();
                console.log('else', requestedData, 'dd', userDate)

                if (requestedData == userDate) {
                    console.log("updated")
                    let myquery = { name: req.body.name };
                    let newvalues = { $set: data };
                    await NewMeasurement.updateOne(myquery, newvalues)
                    return res.status(200).json({ message: 'User details updated successfully', name: req.name })
                }
            }
            //else {
            const details = new NewMeasurement(data)
            await details.save()
            console.log("user details posted successfully")
            return res.status(200).json({ message: 'User details posted successfully', name: req.name })
            //}
        }
    } catch (error) {
        console.log("error", error)
        res.status(500).send({ message: "Something went wrong" })
    }
    console.log('done')
})

export default router;