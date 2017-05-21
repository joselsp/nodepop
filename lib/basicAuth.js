"use strict";

const basicAuth = require('basic-auth');
const Usuario = require('../models/Usuario');
var shajs = require('sha.js');

module.exports = (req, res, next) => {

    const credencial = basicAuth(req);
    const filter = {};

    if (credencial) {
        filter.nombre = credencial.name;
    }

    Usuario.list(filter, (err, usuarios) => {
        if (err) {
            next(err);
            return;
        }

        console.log('usuarios', usuarios);

        if (usuarios.length > 0 && credencial) {
            var claveBBDD = usuarios[0].clave; //Aprovechamos hoisting
            credencial.pass = shajs('sha256').update(credencial.pass).digest('hex');
        }        

        if (!credencial || usuarios.length !== 1 || credencial.pass !== claveBBDD){
           res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
           res.sendStatus(401);
           return;
        }
        
        next();
    });
};