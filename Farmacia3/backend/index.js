const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

//concetar mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/farmaciasalemanas', {
    useNewUrlParser: true
});

//crear servidor

const app = express();

//habilitar badyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

//rutas app

app.use('/', routes());

//puerto

app.listen(5000);