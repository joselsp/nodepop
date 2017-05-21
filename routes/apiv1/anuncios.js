"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const basicAuth = require('../../lib/basicAuth');

//GET /apiv1/anuncios
router.get('/', basicAuth, function(req, res, next) {

    Anuncio.list((err, anuncios) => {
        if(err) {
            next(err);
            return;
        }

        res.json({ succes: true, result: anuncios});        
    }) ;
});

module.exports = router;