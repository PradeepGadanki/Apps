import Goal from '../models/Goal.js'
import express from 'express';

const router = express.Router();

router.post("/goal/", async (req, res) => {
    console.log("details calling", req.body)
    try{
       //let user = await User.findOne({userName: req.body.userName})
        //password: req.body.password

        let goal = new Goal({"carbohydrates": req.body.carbohydrates, "fat": req.body.fat, "protein": req.body.protein, "date": req.body.date, "name": req.body.name})
        goal.save();
        return res.status(200).json("details saved successfully")
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message: "Something went wrong"})
    }
    console.log('done')
})

export default router;