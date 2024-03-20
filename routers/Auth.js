const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const RequireLogin = require("../middleware/RequireLogin")
const AuthModel = require("../models/AuthModel");

router.post('/signup', (req, res) => {
   const {email, password} = req.body
   if( !email || !password){
    return res.status(422).json({error: "Please fill in all fields"})
   }
   AuthModel.findOne({email: email})
   .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "Email is already registered"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new AuthModel({
                email: email,
                password: hashedpassword,
            })
            user.save()
            .then(user => {
                res.json({message: "Record created"})
            })
            .catch(error => {
                console.log(error);
            })
        })
   })
   .catch(err => {
    console.log(err)
   })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "Please enter email or password"})
    }
    AuthModel.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign({ _id: savedUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                const {_id, email, password, followers, following} = savedUser
                res.json({token: token, user: {_id, email, password, followers, following}})
            } 
            else{
                return res.status(422).json({error: "Invalid email or password"})
            }
        })
        .catch(err => { console.log(err) })
    })
})

module.exports = router