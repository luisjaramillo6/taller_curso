const express = require('express');
const app = express();
const sala = require('../models/sala');

app.get('/sala',(req,res)=>{
    sala.find().exec((err,salaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            salaDB
        });
    });
});

app.post('/sala',(req,res)=>{
    let body = req.body
    let salaParaGuardar = new sala({
        name: body.name,
        description: body.description
    });
    salaParaGuardar.save((err,salaDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!salaDB){
            return res.status(400).json({
                ok: false,
                rolDB
            });
        }
        res.status(200).json({
            ok:true,
            salaDB
        });
    });
});
/*
app.delete('/sala/:id',(req,res)=>{
    let id = req.params.id
    let salaState = {
        state: false
    }
    sala.findByIdAndUpdate(id,salaState,{
        new:true,
        runValidators:true
    },(err,salaDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!salaDB){
            ok:false,
            salaDB
        }
        res.status(200).json({
            ok:true,
            salaDB
        })
    })
});
*/

app.put('/sala/:id',(req,res)=>{
    let id = req.params.id
    let body=req.body;
    let salaParaEditar={
      name:body.name,
      description:body.description
    }
    sala.findByIdAndUpdate(id, salaParaEditar,{
        new:true,
        runValidators:true
    },(err, salaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })

        }
        if(!salaDB){
            return res.status(400).json({
                ok:false,
                salaDB
            })
        }
        res.status(200).json({
            ok:true,
            salaDB
        })
    })
});
/*
app.delete('/sala/:id', (req, res) => {
    let id = req.params.id
    let salaState = {
        state: false
    }
    salaState.findByIdAndUpdate(id, salaState, {
        new: true,
        runValidators: true
    }, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!salaDB) {
            ok: false,
                salaDB
        }
        res.status(200).json({
            ok: true,
            salaDB

        });
    })
});
*/
module.exports = app;