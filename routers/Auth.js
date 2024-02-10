const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const RequireLogin = require("../middleware/RequireLogin")
const AuthModel = require("../models/AuthModel");

router.get('/protected', RequireLogin, (req, res) => {
     res.send("hello user")
})

router.post('/signup', (req, res) => {
   const {email, password} = req.body
   // eger bu degerler girilmemise error gonder
   if( !email || !password){
    return res.status(422).json({error: "lütfen tüm alanları doldurun"})
   }
   AuthModel.findOne({email: email})
   .then((savedUser) => {
        if(savedUser){
            // eğer bu erroru alırsa kod devam etmesin diye return koyuldu
            return res.status(422).json({error: "email zaten kayıtlı"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new AuthModel({
                email: email,
                password: hashedpassword,
            })
            user.save()
            .then(user => {
                res.json({message: "kayıt oluşturuldu"})
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
        return res.status(422).json({error: "lütfen email ya da parola girin"})
    }
    AuthModel.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "geçersiz email ya da parola"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "başarıyla giriş yapıldı"})
                const token = jwt.sign({ _id: savedUser._id}, process.env.JWT_SECRET)
                const {_id, email, password, followers, following} = savedUser
                res.json({token: token, user: {_id, email, password, followers, following}})
            } 
            else{
                return res.status(422).json({error: "geçersiz email ya da parola"})
            }
        })
        .catch(err => { console.log(err) })
    })
})

module.exports = router