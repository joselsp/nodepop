const fs = require('fs');
const path = require('path');
const Anuncio = require ('../models/Anuncio');
const Usuario = require ('../models/Usuario');
const mongoose = require('mongoose');
require('../lib/connectMongoose');

mongoose.Promise = global.Promise;

function initDatabase(callback) {

    const fichero = path.join('./db', 'anuncios.json');

    // leemos contenido de un fichero package.json
    fs.readFile(fichero, 'utf-8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        try{
            // parsear el contendo del fichero convirtiendolo en un objeto
            var dataJson = JSON.parse(data);
            
        }catch(err) {
            callback(err);
            return;
        }

        // obtenemos la version
        const anuncios = dataJson.anuncios || '';

        // retornamos la version
        callback(null, anuncios);
    });
}

initDatabase((err, tabla) => {
    if (err) {
        console.log('hubo un error', err);
        return;
    }

    // Eliminamos los datos
    mongoose.connection.db.dropDatabase(function (err, result) {
        if (err) {
            console.log('hubo un error al eliminar la base de datos', err);
            return;
        }

        console.log('Base de datos eliminada', result);

        Anuncio.insertJson(tabla, (err, tabla) => {
            if (err) {
                console.log('Hubo un error al insertar anuncios', err);
                return;
            }
            console.log(' - Anuncios insertados', tabla);

            var userTest = new Usuario({
                nombre: 'admin',
                clave: 'admin', //No deberia estar la clave en claro. Solo para pruebas.
                email: 'admin@admin.com'
            });

            Usuario.saveUser(userTest, (err, userSaved) => {
                if (err) {
                    console.log('Hubo un error al insertar usuarios', err);
                    return;
                }
                console.log(' - Usuario insertado', userSaved);

                mongoose.connection.close();
            });
        });
    });


});