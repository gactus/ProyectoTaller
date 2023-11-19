const express = require('express');
const bodyParser = require('body-parser');
const handleErrors = require('./server/services/md_error');

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

//Rutas
require('./server/routes/personas')(app);
require('./server/routes/utiles')(app);
require('./server/routes/trabajos')(app);
require('./server/routes/login')(app);
require('./server/routes/insumos')(app);
require('./server/routes/usuarios')(app);
require('./server/routes/clientes')(app);
require('./server/routes/proveedores')(app);
require('./server/routes/ventas')(app);
require('./server/routes/vehiculos')(app);
app.get('*',(req,res)=>{
    res.status(200).send({message: "Bienvenido al server Node.js"})
});

app.use(handleErrors);

module.exports = app;