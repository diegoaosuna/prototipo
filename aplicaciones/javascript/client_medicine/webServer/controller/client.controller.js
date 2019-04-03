var enrollAdmin = require('./../../apps/enrollAdmin');
var resgisterUser = require('./../../apps/registerUser');
var queryMedicine = require('./../../apps/queryMedicine');
var queryAllMedicines = require('./../../apps/queryAllMedicines');
var txnCrearMedicina = require('./../../apps/txnCrearMedicina');
var txnDistribuirMedicina = require('./../../apps/txnDistribuirMedicina');
var txnEnviarMedicina = require('./../../apps/txnEnviarMedicina');
var txnEntregarMedicina = require('./../../apps/txnEntregarMedicina');
var txnVenderMedicina = require('./../../apps/txnVenderMedicina');
var queryByOrg = require('./../../apps/queryByOrg');
var txnDistribuirLista = require('./../../apps/txnDistribuirLista');
var txnEnviarLista = require('./../../apps/txnEnviarLista');
var txnEntregarLista = require('./../../apps/txnEntregarLista');
var txnVenderLista = require('./../../apps/txnVenderLista');

//Exporta la función para hacer el test
exports.test = function  (req, res) {
  var text = req.query.text || '';  
  res.send('Greetings from the Test controller!'+text);
};

exports.enrollAdmin = function(req,res){
    	enrollAdmin.main();
}

exports.registerUser = function(req,res){
    	resgisterUser.main();
}


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

exports.queryByOrg = async function(req,res){
	let org = req.query.org || '';
	let resultado = (await queryByOrg.main(org)).toString();
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

exports.txnEntregarMedicina = async function(req,res){
	let id = req.query.id || '';
    	let resultado = (await txnEntregarMedicina.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}

exports.txnEnviarMedicina = async function(req,res){
    	let id = req.query.id || '';
	let resultado = (await txnEnviarMedicina.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}

exports.txnVenderMedicina = async function(req,res){
    	let id = req.query.id || '';
	let resultado = (await txnVenderMedicina.main(id)).toString();
        resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}

exports.txnDistribuirLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnDistribuirLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}

exports.txnEntregarLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnEntregarLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}

exports.txnEnviarLista = async function(req,res){
	let list = req.query.list || '';
	let resultado = (await txnEnviarLista.main(list))/*.toString();*/
	//resultado = resultado.replace(/\\/g, "");
	res.send(resultado.toString());
}

exports.txnVenderLista = async function(req,res){
    	let list = req.query.list || '';
	let resultado = (await txnVenderLista.main(list))/*.toString();*/
        //resultado = resultado.replace(/\\/g, "");
        res.send(resultado.toString());
}



