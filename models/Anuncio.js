"use strict";

const mongoose = require('mongoose');

// definimos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]    
});

// método estático
anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); 
    query.sort(sort);
    query.exec(callback);
};

// método estático
anuncioSchema.statics.listTags = function(callback) {
    const query = Anuncio.find().distinct('tags');
    query.exec(callback);
};

// método estático
anuncioSchema.statics.insertJson = function(jsonData, callback) {
    Anuncio.insertMany(jsonData, function(err, post) {
        if (err){
            callback(err);
            return;
        } 
        callback(null, post);
    });    
};

// creamos el modelo
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;