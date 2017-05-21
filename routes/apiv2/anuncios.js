"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const basicAuth = require('../../lib/basicAuth');

//GET /apiv2/anuncios
router.get('/', basicAuth, function(req, res, next) {

    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tag;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (nombre){
        filter.nombre = new RegExp('^' + nombre, "i");;
    }

    if (venta){
        filter.venta = venta;
    }

    if (tags){
        filter.tags = tags;
    }

    if (precio){
        const rangoPrecio = precio.split("-");

        if (rangoPrecio[0] && rangoPrecio[1]){                                      // precio incluido entre valores
            filter.precio =  { '$gte': rangoPrecio[0], '$lte': rangoPrecio[1] };
        }else if(precio.startsWith("-")){                                           //precio menor o igual que
            filter.precio = { '$lte': rangoPrecio[1] };            
        }else if(precio.endsWith("-")){                                             //precio mayor o igual que
                filter.precio = { $gte: rangoPrecio[0] };            
        }else {                                                                     //precio igual a
            filter.precio = precio;
        }
    }

    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        if(err) {
            next(err);
            return;
        }

        res.json({ succes: true, result: anuncios});        
    });
});

//GET /apiv2/anuncios/tags
router.get('/tags', basicAuth, function(req, res, next) {
    Anuncio.listTags((err, tags) => {
        if(err) {
            next(err);
            return;
        }

        res.json({ succes: true, result: tags });
    });
});

module.exports = router;