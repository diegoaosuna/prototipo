// app.js

const express = require('express');//Importa el módulo express
const bodyParser = require('body-parser'); //Importa el módulo body-parser
const client = require('./routes/client.route');  //Importa el repertorio de rutas



//Inicializa express
var app = express(); 

//Body-parser is used to parse the incoming request bodies in a middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Expone el repertorio de rutas en /client/...
app.use(client); 

 //Crea el servidor por el puerto port
 var port = 8085;
app.listen(port, ()=>{
    console.log('Server is up and runnign on port number '+port);
});
