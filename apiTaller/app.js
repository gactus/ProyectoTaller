const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
require('./server/asociations');

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});

function handleErrors(err,req,res,next){
    console.log(err);
    res.status(500).send('Atención: Ha ocurrido un error.');
}

app.use(handleErrors);

//Rutas
require('./server/routes/personas')(app);
require('./server/routes/utiles')(app);
require('./server/routes/trabajos')(app);
require('./server/routes/login')(app);
app.get('*',(req,res)=>{
    res.status(200).send({message: "Bienvenido al server Node.js"})
});

module.exports = app;