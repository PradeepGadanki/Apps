import User from '../models/user.js'
import express from 'express';

const router = express.Router();

router.post("/register/", async (req, res) => {
    console.log("details calling", req.body.userName)
    try{
       let user = await User.findOne({userName: req.body.userName})
        //password: req.body.password
        if (user) {
            console.log('User already exist')
            return res.status(400).json({message: "user exists"})
        }
        user = new User(req.body)
        await user.save()
        console.log("user created successfully")
        return res.status(200).json({message: 'User created successfully', "userId": user._id, "userName":user?.userName })
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message: "Something went wrong"})
    }
    console.log('done')
})

export default router;