const express = require('express');
const app = express();
const PermisoAcceso = require('../models/permiso_acceso');
const date = require('date-and-time');
let dateFormat = require('dateformat');
const Sala = require('../models/sala');

let now = new Date();

app.get('/permiso',(req,res)=>{
    PermisoAcceso.find({
        state:true
    }).exec((err,permisos)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!permisos){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            permisos
        });
    });
});
/*
app.post('/permiso',(req,res)=>{

})*/

app.post('/permiso',(req,res)=>{
    let body = req.body
    let permiso_guardar_entrada= new PermisoAcceso({
        date: dateFormat(now,"dddd,d'de' mmmm,yyyy"),
        hour:dateFormat(now,"hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        typeAcces: "ENTRADA",
        state:body.state
    });
    let permiso_guardar_salida= new PermisoAcceso({
        date: dateFormat(now,"dddd,d'de' mmmm,yyyy"),
        hour:dateFormat(now,"hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        typeAcces: "SALIDA",
        state:body.state
    });
    PermisoAcceso.findOne({
        user:body.user
    },(err,result)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(result === null){
            permiso_guardar_entrada.save();
            return res.status(200).json({
                ok:true,
                acceso:permiso_guardar_entrada
            })
        }else{
            if(result.typeAcces === 'SALIDA'){
                permiso_guardar_entrada.save();
                return res.status(200).json({
                    ok:true,
                    acceso:permiso_guardar_entrada
                })
            }else{
                if(result.typeAcces === 'ENTRADA'){
                    permiso_guardar_salida.save();
                    return res.status(200).json({
                        ok:true,
                        acceso:permiso_guardar_salida
                    });
                }
            }
        }
    }).sort({
        _id: -1
    }),permiso_guardar.save((err,permiso) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!rolDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            permiso
        })
    })
})
module.exports = app;