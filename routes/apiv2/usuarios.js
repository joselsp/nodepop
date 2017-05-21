"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');

// POST /apiv1/usuarios
router.post('/', (req, res, next) => {
    console.log(req.body);

    //validaciones

    // creamos un objeto de tipo Usuario
    const usuario = new Usuario(req.body);
    Usuario.saveUser(usuario, (err, userSaved) => {
         if(err) {
            next(err);
            return;
        }
        res.json({ succes: true, result: userSaved });
    });
});

//pendiente
//router.post('/authenticate', (req, res, next) => {
//    console.log('authenticate', req.body);
//});

module.exports = router;