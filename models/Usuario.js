"use strict";

const mongoose = require('mongoose');
const shajs = require('sha.js');

// definimos el esquema
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true,
        unique: true
    }, 
    clave: String,
    email: {
        type: String,
        index: true,
        unique: true
    }
});

// listar anuncios
usuarioSchema.statics.list = function(filter, callback) {
    const query = Usuario.find(filter);
    query.exec(callback);
};

// guardar usuarios
usuarioSchema.statics.saveUser = function(user, callback) {
    //establecemos la contraseña en un hash
    user.clave = shajs('sha256').update(user.clave).digest('hex');
    user.save((err, userSaved) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, userSaved);
    });
};

// luego creamos el modelo
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;