'use strict';

const { Contract } = require('fabric-contract-api');

class Producto extends Contract{

    async initLedger(ctx){

    }

	async crear(ctx,id, nombre, descripcion, fecha, usuario, comentario){
        	let key = ('Producto'+id);
        	let productAsBytes = await ctx.stub.getState(key);

        	if (!productAsBytes || productAsBytes.length === 0) {

            		const producto = {
               		id,
                	nombre,
                	descripcion,
                	fecha,
                	usuario,
                	comentario,
                	propietario:'Proveedor',
                	estado: 'Creado',
            		}

            		await ctx.stub.putState('Producto'+producto.id,Buffer.from(JSON.stringify(producto)));
            		return JSON.stringify(producto);
        	}else{
            		return(`El id ${id} ya fue registrado`);
        	}        
    }
}

module.exports = Producto;

