'use strict';

const { Contract } = require('fabric-contract-api');

class Producto extends Contract{

    async initLedger(ctx){

    }
    async cambiarEstado(ctx, id, usuario, comentario){
            
        let numeroProducto = ('Producto'+id);
        let productoAsBytes = await ctx.stub.getState(numeroProducto);

        if (!productoAsBytes || productoAsBytes.length === 0) {
            throw new Error(`${numeroProducto} does not exist`);
        }

        const producto = JSON.parse(productoAsBytes.toString());

        if ((producto.estado == 'Creado')&&(producto.propietario == 'Proveedor')) {
            producto.propietario = 'Logistica';
            producto.estado = 'En logistica'; 
            producto.usuario = usuario;
            producto.comentario = comentario;           
        }else if((producto.estado == 'En logistica')&&(producto.propietario == 'Logistica')){
            producto.propietario = 'Almacen';
            producto.estado = 'En venta'; 
            producto.usuario = usuario;
            producto.comentario = comentario;
        }else if ((producto.estado == 'En venta')&&(producto.propietario == 'Almacen')){
            producto.propietario = 'Cliente';
            producto.estado = 'Vendido'; 
            producto.usuario = usuario;
            producto.comentario = comentario;
        }
        //Actualizar producto
        
        await ctx.stub.putState(numeroProducto, Buffer.from(JSON.stringify(producto)));
        return JSON.stringify(producto);

    }
}

module.exports = Producto;

