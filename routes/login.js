const express = require('express')
const app = express()
const Usuario = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.post('/login',(req,res)=>{
    body=req.body
    Usuario.findOne({
        username:body.username
    },(err,result)=>{
        if(err){
            res.status(500).json({
                ok:false,
                err
            });
        }
        if(!result){
            res.status.json(400).json({
                ok:true,
                result
            })
        }

        const match = bcrypt.compareSync(body.password, result.password)
        if(match){
            let token = jwt.sign({
                usuario: result
            },process.env.SEED,{
                expiresIn: process.env.CADUCIDAD
            });
            res.json({
                ok:true,
                usuario: result,
                token
            })

        }
    })
    
})

module.exports = app