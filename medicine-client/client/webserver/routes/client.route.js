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

//PRODUCTS ROUTES
router.get('/crear', client_controller.crear);
router.get('/cambiarEstado',client_controller.cambiarEstado);
router.get('/historial', client_controller.obtenerHistorial);


//ORG1 ROUTES
router.get('/resgistrarAdmin-org1',client_controller.enrollAdmin_org1);
router.get('/registerUser-org1',client_controller.registerUser_org1);
router.get('/medicinas-org1',client_controller.queryByOrg_org1);
router.get('/crearMedicina',client_controller.txnCrearMedicina);
router.get('/distribuirMedicina',client_controller.txnDistribuirMedicina);
router.get('/distribuirLista',client_controller.txnDistribuirLista);


//ORG2 ROUTES
router.get('/resgistrarAdmin-org2',client_controller.enrollAdmin_org2);
router.get('/registerUser-org2',client_controller.registerUser_org2);
router.get('/medicinas-org2',client_controller.queryByOrg_org2);
router.get('/enviarMedicina',client_controller.txnEnviarMedicina);
router.get('/enviarLista',client_controller.txnEnviarLista);


//ORG3 ROUTES
router.get('/resgistrarAdmin-org3',client_controller.enrollAdmin_org3);
router.get('/registerUser-org3',client_controller.registerUser_org3);
router.get('/medicinas-org3',client_controller.queryByOrg_org3);
router.get('/entregarMedicina',client_controller.txnEntregarMedicina);
router.get('/entregarLista',client_controller.txnEntregarLista);


//ORG4 ROUTES
router.get('/resgistrarAdmin-org4',client_controller.enrollAdmin_org4);
router.get('/registerUser-org4',client_controller.registerUser_org4);
router.get('/medicinas-org4',client_controller.queryByOrg_org4);
router.get('/venderMedicina',client_controller.txnVenderMedicina);
router.get('/venderLista',client_controller.txnVenderLista);

//QUERIES ROUTES
router.get('/consultarHistorial', client_controller.getHistory);
router.get('/buscarMedicina',client_controller.queryMedicine);
router.get('/medicinas', client_controller.queryAllMedicines);


//Exportar router para utilizar las funciones según la ruta
module.exports = router; 
