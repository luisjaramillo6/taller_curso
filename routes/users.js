const express = require('express');
const app = express();
const User = require('../models/users');
const bcrypt = require("bcrypt");
const {verificar_token}=require('../middleware/auth')

//app.use(require('./users.js'));

app.get('/users', verificar_token, (req, res) => {
    User.find({
        "state": true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status.json({
                ok: true,
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuarioDB
        });
    }
    ).populate('Rol');
});

app.post("/users", (req, res) => {
    let body = req.body;
    let userGuardar = new User({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password,10),
        age: body.age,
        rol: body.rol
    });
    userGuardar.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        return res.status(200).json({
            ok: true,
            data: usuarioDB

        });
    })
})

app.put('/users/:id',verificar_token, (req, res) => {
    let id = req.params.id
    let body = req.body;
    let usuarioPorEditar = {
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad,
        email: body.email,
        username: body.username,
        password: body.password,
        rol: body.rol

    }

    User.findByIdAndUpdate(id, usuarioPorEditar, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                usuarioDB
            });
        }
        res.status(200).json({
            ok: true,
            usuarioDB

        });

    });
});


app.delete('/users/:id', verificar_token, (req, res) => {
    let id = req.params.id
    let usuarioState = {
        state: false
    }
    usuarioState.findByIdAndUpdate(id, usuarioState, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            ok: false,
                usuarioDB
        }
        res.status(200).json({
            ok: true,
            usuarioDB

        });
    })
});
module.exports = app;