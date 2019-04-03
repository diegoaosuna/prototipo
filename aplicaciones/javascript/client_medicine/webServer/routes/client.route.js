// Este archivo contendrá las rutas de los productos

const express = require('express');
const router = express.Router(); //router invocará los métodos según la ruta


//Importar los controladores
const client_controller = require('./../controller/client.controller');  

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Test para verificar la conexión de archivos
router.get('/test', client_controller.test);

router.get('/enrollAdmin',client_controller.enrollAdmin);

router.get('/registerUser',client_controller.registerUser);

router.get('/buscarMedicina',client_controller.queryMedicine);

router.get('/buscarPorOrg',client_controller.queryByOrg);

router.get('/medicinas', client_controller.queryAllMedicines);

router.get('/crearMedicina',client_controller.txnCrearMedicina);

router.get('/distribuirMedicina',client_controller.txnDistribuirMedicina);

router.get('/enviarMedicina',client_controller.txnEnviarMedicina);

router.get('/entregarMedicina',client_controller.txnEntregarMedicina);

router.get('/venderMedicina',client_controller.txnVenderMedicina);

router.get('/distribuirLista',client_controller.txnDistribuirLista);

router.get('/enviarLista',client_controller.txnEnviarLista);

router.get('/entregarLista',client_controller.txnEntregarLista);

router.get('/venderLista',client_controller.txnVenderLista);




//Exportar router para utilizar las funciones según la ruta
module.exports = router; 
