const express = require('express');
const app = express();
const User = require('../models/users');
//app.use(require('./users.js'));

app.get('/users', (req, res) => {
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
        name: body.nombre,
        lastname: body.apellido,
        email: body.email,
        username: body.username,
        password: body.password,
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

app.put('/users/:id', (req, res) => {
    let id = req.params.id
    let body = req.body;
    let usuarioPorEditar = {
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad
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
        if (!res) {
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


app.delete('/users', (req, res) => {
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