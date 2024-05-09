import User from '../models/user.js'
import express from 'express';

const router = express.Router();

router.post("/login/", async (req, res) => {
    console.log("details calling", req.body.userName)
    try{
       let user = await User.findOne({userName: req.body.userName})
        //password: req.body.password
        if (user) {
            if (req.body.password == user.password) {
                console.log("user logged in successful", {message: 'User logged in successful', "userId": user._id, "userName":user?.userName })
                return res.status(200).json({message: 'User logged in successful', "userId": user._id, "userName":user?.userName, 'ok': true })
            }
        } else {
            return res.status(400).json({message: "Invalid credetials", 'ok': false})
        }
        return res.status(400).json({message: "Invalid credetials", 'ok': false})
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message: "Something went wrong", 'ok': false})
    }
    console.log('done')
})

export default router;