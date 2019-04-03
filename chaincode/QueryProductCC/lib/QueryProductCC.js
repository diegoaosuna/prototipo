'use strict';

const { Contract } = require('fabric-contract-api');

class Producto extends Contract{

    async initLedger(ctx){

    }


    convertirFecha(timestamp) {
        let unixtimestamp = timestamp;

        // Months array
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        
        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp*1000);
        
        // Year
        var year = date.getFullYear();

        // Month
        var month = months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        // Hours
        var hours = date.getHours();

        // Minutes
        var minutes = "0" + date.getMinutes();

        // Seconds
        var seconds = "0" + date.getSeconds();

        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +' [UTC]';
        
        return convdataTime;
    }

    async obtenerHistorial(ctx, id) {


        let key  = ('Producto'+ id);
        console.info('- Inicio consultar historial: %s\n',key);
        let iterator = await ctx.stub.getHistoryForKey(key);

        //Transform iterator to array of objects
        const allResults = [];

        let res = null;
        while(res==null || !res.done){
            res = await iterator.next();
            if(res.value && res.value.value.toString()){
                let parsedItem = {
                    is_delete: false,
                    value: {},
                    timestamp: null,
                    tx_id: ''
                };

                try {
                    parsedItem.value = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    parsedItem.value = res.value.value.toString('utf8');
                }

                parsedItem.is_delete = res.value.is_delete;
                parsedItem.tx_id = res.value.tx_id;        
                parsedItem.timestamp = /*convdataTime*/ this.convertirFecha(res.value.timestamp.getSeconds());

                allResults.push(parsedItem);
            }
        }

        await iterator.close();

        return allResults;
    }
}

module.exports = Producto;

