

/*================vars==================*/

//vars ORG1
var enrollAdmin_org1 = require('./../../apps/org1/enrollAdmin');
var resgisterUser_org1 = require('./../../apps/org1/registerUser');
var queryByOrg_org1 = require('./../../apps/org1/queryByOrg');
var txnCrearMedicina = require('./../../apps/org1/txnCrearMedicina');
var txnDistribuirMedicina = require('./../../apps/org1/txnDistribuirMedicina');
var txnDistribuirLista = require('./../../apps/org1/txnDistribuirLista');

//vars ORG2
var enrollAdmin_org2 = require('./../../apps/org2/enrollAdmin');
var resgisterUser_org2 = require('./../../apps/org2/registerUser');
var queryByOrg_org2 = require('./../../apps/org2/queryByOrg');
var txnEnviarMedicina = require('./../../apps/org2/txnEnviarMedicina');
var txnEnviarLista = require('./../../apps/org2/txnEnviarLista');

//vars ORG3
var enrollAdmin_org3 = require('./../../apps/org3/enrollAdmin');
var resgisterUser_org3 = require('./../../apps/org3/registerUser');
var queryByOrg_org3 = require('./../../apps/org3/queryByOrg');
var txnEntregarMedicina = require('./../../apps/org3/txnEntregarMedicina');
var txnEntregarLista = require('./../../apps/org3/txnEntregarLista');


//vars ORG4
var enrollAdmin_org4 = require('./../../apps/org4/enrollAdmin');
var resgisterUser_org4 = require('./../../apps/org4/registerUser');
var queryByOrg_org4 = require('./../../apps/org4/queryByOrg');
var txnVenderMedicina = require('./../../apps/org4/txnVenderMedicina');
var txnVenderLista = require('./../../apps/org4/txnVenderLista');


//vars QUERIES
var queryMedicine = require('./../../apps/queries-apps/queryMedicine');
var queryAllMedicines = require('./../../apps/queries-apps/queryAllMedicines');
var getHistory = require('./../../apps/queries-apps/getHistory');


//vars PRODUCTS
var crear = require('./../../apps/products/crear');
var cambiarEstado = require('./../../apps/products/cambiarEstado');
var obtenerHistorial = require('./../../apps/products/obtenerHistorial');
/*================funcs==================*/



//PRODUCTS
exports.crear = async function(req,res){
	let id = req.query.id || '';
    	let nombre = req.query.nombre || '';
	let descripcion = req.query.descripcion || '';
	let fecha = req.query.fecha || '';
	let usuario = req.query.usuario || '';
        let comentario = req.query.comentario || '';
	let propietario = req.query.propietario || '';
	let estado = req.query.estado || '';
	let resultado = (await crear.main(id,nombre,descripcion,fecha,usuario,comentario,propietario,estado)).toString();
    resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
	
}
exports.cambiarEstado = async function(req,res){
	let id = req.query.id || '';
	let usuario = req.query.usuario || '';
	let comentario = req.query.comentario || '';
    let resultado = (await cambiarEstado.main(id,usuario,comentario)).toString();
    resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
}
exports.obtenerHistorial = async function(req,res){
	let id = req.query.id || '';
    let resultado = (await obtenerHistorial.main(id)).toString();
    resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
}


//Exporta la función para hacer el test
exports.test = function  (req, res) {
  var text = req.query.text || '';  
  res.send('Greetings from the Test controller!'+text);
};


//ORG1
exports.enrollAdmin_org1 = function(req,res){
	enrollAdmin_org1.main();
}
exports.registerUser_org1 = function(req,res){
	resgisterUser_org1.main();
}
exports.queryByOrg_org1 = async function(req,res){
	let resultado = (await queryByOrg_org1.main()).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.txnCrearMedicina = async function(req,res){
	let id = req.query.id || '';
	let reqNombre = req.query.nombre || '';
    	let nombre = reqNombre.replace(/-/g, " ");
	let reqDescripcion = req.query.descripcion || '';
    	let descripcion = reqDescripcion.replace(/-/g, " ");
    	let resultado = (await txnCrearMedicina.main(id,nombre,descripcion)).toString(); 
	resultado = resultado.replace(/\\/g, "");
    	res.send(resultado.toString());

}
exports.txnDistribuirMedicina = async function(req,res){
    let id = req.query.id || '';
    let resultado = (await txnDistribuirMedicina.main(id)).toString();
    resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
	
}
exports.txnDistribuirLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnDistribuirLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}


//ORG2
exports.enrollAdmin_org2 = function(req,res){
	enrollAdmin_org2.main();
}
exports.registerUser_org2 = function(req,res){
	resgisterUser_org2.main();
}
exports.queryByOrg_org2 = async function(req,res){
	let resultado = (await queryByOrg_org2.main('Distribuidor')).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.txnEnviarMedicina = async function(req,res){
	let id = req.query.id || '';
    	let resultado = (await txnEnviarMedicina.main(id)).toString();
   	resultado = resultado.replace(/\\/g, "");
    	res.send(resultado.toString());
}
exports.txnEnviarLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnEnviarLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}


//ORG3
exports.enrollAdmin_org3 = function(req,res){
	enrollAdmin_org3.main();
}
exports.registerUser_org3 = function(req,res){
	resgisterUser_org3.main();
}
exports.queryByOrg_org3 = async function(req,res){
	let org = req.query.org || '';
	let resultado = (await queryByOrg_org3.main('Transportador')).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.txnEntregarMedicina = async function(req,res){
	let id = req.query.id || '';
    	let resultado = (await txnEntregarMedicina.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.txnEntregarLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnEntregarLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}


//ORG4
exports.enrollAdmin_org4 = function(req,res){
	enrollAdmin_org4.main();
}
exports.registerUser_org4 = function(req,res){
	resgisterUser_org4.main();
}
exports.queryByOrg_org4 = async function(req,res){
	let org = req.query.org || '';
	let resultado = (await queryByOrg_org4.main('Vendedor')).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.txnVenderMedicina = async function(req,res){
	let id = req.query.id || '';
    let resultado = (await txnVenderMedicina.main(id)).toString();
    resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
}
exports.txnVenderLista = async function(req,res){
	let list = req.query.list || '';
    let resultado = (await txnVenderLista.main(list))/*.toString();*/
    //resultado = resultado.replace(/\\/g, "");
    res.send(resultado.toString());
}




//QUERIES ADMIN
exports.queryMedicine = async function(req,res){
	let id = req.query.id || '';
	let resultado = (await queryMedicine.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.queryAllMedicines = async function(req,res){
	let resultado = (await queryAllMedicines.main()).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}
exports.getHistory = async function(req,res){
	let id = req.query.id || '';
	let resultado = (await getHistory.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}



