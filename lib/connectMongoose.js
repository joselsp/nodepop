"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

// establecemos libreria de promesas
mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

mongoose.connect('mongodb://localhost/nodepop');