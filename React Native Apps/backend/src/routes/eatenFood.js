import EatenFood from '../models/EatenFood.js'
import express from 'express';

const router = express.Router();

router.post("/eatenFood/", async (req, res) => {
    console.log("details calling in eaten food", req.body)
    try{
       //let user = await User.findOne({userName: req.body.userName})
        //password: req.body.password
        let eatenFood = new EatenFood({"food": req.body.food, "carbohydrates": req.body.carbohydrates, "fat": req.body.fat, "protein": req.body.protein, "date": req.body.date, "name": req.body.name, "foodType": req.body.foodType})
        eatenFood.save();
        return res.status(200).json("details saved successfully in eaten")
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message: "Something went wrong"})
    }
    console.log('done');
})

export default router;