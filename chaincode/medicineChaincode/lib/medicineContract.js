'use strict';

const { Contract } = require('fabric-contract-api');

class Medicine extends Contract{

    async initLedger(ctx){

    const medicines = [
        {
            id:'01',
            name:'Acetaminofen',
            owner:'Laboratorio',
            description:'Tabletas x12',
            state: 'Creado'
        },
        {
            id:'02',
            name:'Advil',
            owner:'Laboratorio',
            description:'Capsulas',
            state: 'Creado'
        },
        {
            id:'03',
            name:'Noraver gripa',
            owner:'Laboratorio',
            description:'Jarabe 500ml',
            state: 'Creado'
        },
        {
            id:'04',
            name:'Dolex',
            owner:'Laboratorio',
            description:'Gripa tableta x12',
            state: 'Creado'
        }
    ]

    for(let i =0; i<medicines.length;i++){

        await ctx.stub.putState('Medicine'+medicines[i].id,Buffer.from(JSON.stringify(medicines[i])));
        console.info('============= END : Initialize Ledger ===========');
    }
    

    }

    async updateLedger(){

    }

    convertDate(timestamp) {
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

    async getHistory(ctx, id) {


        let key  = ('Medicine'+ id);
        console.info('- start getHistory: %s\n',key);
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
                parsedItem.timestamp = /*convdataTime*/ this.convertDate(res.value.timestamp.getSeconds());

                allResults.push(parsedItem);
            }
        }

        await iterator.close();

        return allResults;
    }

    async queryMedicine(ctx, medicineNumber){
        const key = ('Medicine'+medicineNumber);
        const medicineAsBytes = await ctx.stub.getState(key);
        if (!medicineAsBytes || medicineAsBytes.length === 0) {
            throw new Error(`${medicineNumber} does not exist`);
        }
        console.log(medicineAsBytes.toString());
        return medicineAsBytes.toString();
    }

    async queryAllMedicines(ctx) {
        const startKey = 'Medicine0';
        const endKey = 'Medicine999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryByOrg(ctx,org){

        const startKey = 'Medicine0';
        const endKey = 'Medicine100';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const orgs = [];

        while(true){
            const res = await iterator.next();

            if (res.value && res.value.value.toString()){
                console.log(res.value.value.toString('utf8'));
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if(Record.owner === org){
                    orgs.push({ Key, Record });
                }
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(orgs);
                return JSON.stringify(orgs);
            }
        }
    }

    async txnCrearMedicina(ctx,id, name, description){
        
        const medicine = {
                id:id,
                name:name,
                owner:'Laboratorio',
                description:description,
                state: 'Creado'
        }
        await ctx.stub.putState('Medicine'+medicine.id,Buffer.from(JSON.stringify(medicine)));
        return JSON.stringify(medicine);

    }

    async txnDistribuirMedicina(ctx, id){
            
        let medicineNumber = ('Medicine'+id);
        let medicineAsBytes = await ctx.stub.getState(medicineNumber);

        if (!medicineAsBytes || medicineAsBytes.length === 0) {
            throw new Error(`${medicineNumber} does not exist`);
        }

        const medicine = JSON.parse(medicineAsBytes.toString());

        if (medicine.state !== 'Creado') {
            throw new Error(medicineNumber +' Debe tener estado \'Creado\' para ejecutar la transacción. Estado Actual : ' + medicine.state);
        }
        if(medicine.owner !== 'Laboratorio'){
            throw new Error(medicineNumber +' Debe tener propietatio \'Laboratorio\' para ejecutar la transacción. Propietario Actual : ' + medicine.owner);
        }

        medicine.owner = 'Distribuidor';
        medicine.state = 'En Distribucion';
                

        //Update Medicine
        
        await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicine)));
        return JSON.stringify(medicine);

    }

    async txnEnviarMedicina(ctx, id){
            
        let medicineNumber = ('Medicine'+id);
        let medicineAsBytes = await ctx.stub.getState(medicineNumber);

        if (!medicineAsBytes || medicineAsBytes.length === 0) {
            throw new Error(`${medicineNumber} does not exist`);
        }

        const medicine = JSON.parse(medicineAsBytes.toString());

        if (medicine.state !== 'En Distribucion') {
            throw new Error(medicineNumber +' Debe tener estado \'En Distribucion\' para ejecutar la transacción. Estado Actual : ' + medicine.state);
        }
        if(medicine.owner !== 'Distribuidor'){
            throw new Error(medicineNumber +' Debe tener propietatio \'Distribuidor\' para ejecutar la transacción. Propietario Actual : ' + medicine.owner);
        }

        medicine.owner = 'Transportador';
        medicine.state = 'En Transporte';
                

        //Update Medicine
        
        await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicine)));
        return JSON.stringify(medicine);

    }

    async txnEntregarMedicina(ctx, id){  //El transportador hace entrega del medicamento a la tienda
            
        let medicineNumber = ('Medicine'+id);
        let medicineAsBytes = await ctx.stub.getState(medicineNumber);

        if (!medicineAsBytes || medicineAsBytes.length === 0) {
            throw new Error(`${medicineNumber} does not exist`);
        }

        const medicine = JSON.parse(medicineAsBytes.toString());

        if (medicine.state !== 'En Transporte') {
            throw new Error(medicineNumber +' Debe tener estado \'En Transporte\' para ejecutar la transacción. Estado Actual : ' + medicine.state);
        }
        if(medicine.owner !== 'Transportador'){
            throw new Error(medicineNumber +' Debe tener propietatio \'Transportador\' para ejecutar la transacción. Propietario Actual : ' + medicine.owner);
        }

        medicine.owner = 'Vendedor';
        medicine.state = 'En Venta';
                

        //Update Medicine
        
        await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicine)));
        return JSON.stringify(medicine);

    }

    async txnVenderMedicina(ctx, id){  
            
        let medicineNumber = ('Medicine'+id);
        let medicineAsBytes = await ctx.stub.getState(medicineNumber);

        if (!medicineAsBytes || medicineAsBytes.length === 0) {
            throw new Error(`${medicineNumber} does not exist`);
        }

        const medicine = JSON.parse(medicineAsBytes.toString());

        if (medicine.state !== 'En Venta') {
            throw new Error(medicineNumber +' Debe tener estado \'En Venta\' para ejecutar la transacción. Estado Actual : ' + medicine.state);
        }
        if(medicine.owner !== 'Vendedor'){
            throw new Error(medicineNumber +' Debe tener propietatio \'Vendedor\' para ejecutar la transacción. Propietario Actual : ' + medicine.owner);
        }

        medicine.owner = 'Cliente';
        medicine.state = 'Vendido';
                

        //Update Medicine
        
        await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicine)));
        return JSON.stringify(medicine);

    }

    async txnDistribuirListaMedicinas(ctx, arr){

    var medicinas = arr.split(",");

        let allResults = [];
        for(let i =0;i<medicinas.length;i++){
            var medicineNumber = ('Medicine'+medicinas[i]);
            var medicineAsBytes = await ctx.stub.getState(medicineNumber);

            if (!medicineAsBytes || medicineAsBytes.length === 0) {
                throw new Error(`${medicineNumber} does not exist`);
            }


            var medicina = JSON.parse(medicineAsBytes.toString());

            if (medicina.state !== 'Creado') {
                throw new Error(medicineNumber +' Debe tener estado \'Creado\' para ejecutar la transacción. Estado Actual : ' + medicina.state);
            }
            if(medicina.owner !== 'Laboratorio'){
                throw new Error(medicineNumber +' Debe tener propietatio \'Laboratorio\' para ejecutar la transacción. Propietario Actual : ' + medicina.owner);
            }

            medicina.owner = 'Distribuidor';
            medicina.state = 'En Distribucion';
                

            //Update Medicine
            
            await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicina)));
            allResults.push( JSON.stringify(medicina));
            
        }
        console.info(allResults);
        return ('successful');

    }

    async txnEnviarListaMedicinas(ctx, arr){

        var medicinas = arr.split(",");
    
        let allResults = [];
        for(let i =0;i<medicinas.length;i++){
            var medicineNumber = ('Medicine'+medicinas[i]);
            var medicineAsBytes = await ctx.stub.getState(medicineNumber);
    
            if (!medicineAsBytes || medicineAsBytes.length === 0) {
                throw new Error(`${medicineNumber} does not exist`);
            }
    
    
            var medicina = JSON.parse(medicineAsBytes.toString());
    
            if (medicina.state !== 'En Distribucion') {
                throw new Error(medicineNumber +' Debe tener estado \'En Distribucion\' para ejecutar la transacción. Estado Actual : ' + medicina.state);
            }
            if(medicina.owner !== 'Distribuidor'){
                throw new Error(medicineNumber +' Debe tener propietatio \'Distribuidor\' para ejecutar la transacción. Propietario Actual : ' + medicina.owner);
            }
        
            medicina.owner = 'Transportador';
            medicina.state = 'En Transporte';
                
    
            //Update Medicine
            
            await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicina)));
            allResults.push( JSON.stringify(medicina));
            
        }
        console.info(allResults);
        return ('successful');
    
    }

    async txnEntregarListaMedicinas(ctx, arr){

        var medicinas = arr.split(",");
    
        let allResults = [];
        for(let i =0;i<medicinas.length;i++){
            var medicineNumber = ('Medicine'+medicinas[i]);
            var medicineAsBytes = await ctx.stub.getState(medicineNumber);
    
            if (!medicineAsBytes || medicineAsBytes.length === 0) {
                throw new Error(`${medicineNumber} does not exist`);
            }
    
    
            var medicina = JSON.parse(medicineAsBytes.toString());
    
            if (medicina.state !== 'En Transporte') {
                throw new Error(medicineNumber +' Debe tener estado \'En Transporte\' para ejecutar la transacción. Estado Actual : ' + medicina.state);
            }
            if(medicina.owner !== 'Transportador'){
                throw new Error(medicineNumber +' Debe tener propietatio \'Transportador\' para ejecutar la transacción. Propietario Actual : ' + medicina.owner);
            }
        
            medicina.owner = 'Vendedor';
            medicina.state = 'En Venta';
                
    
            //Update Medicine
            
            await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicina)));
            allResults.push( JSON.stringify(medicina));
            
        }
        console.info(allResults);
        return ('successful');
    
    }

    async txnVenderListaMedicinas(ctx, arr){

        var medicinas = arr.split(",");
    
        let allResults = [];
        for(let i =0;i<medicinas.length;i++){
            var medicineNumber = ('Medicine'+medicinas[i]);
            var medicineAsBytes = await ctx.stub.getState(medicineNumber);
    
            if (!medicineAsBytes || medicineAsBytes.length === 0) {
                throw new Error(`${medicineNumber} does not exist`);
            }
    
    
            var medicina = JSON.parse(medicineAsBytes.toString());
    
            if (medicina.state !== 'En Venta') {
                throw new Error(medicineNumber +' Debe tener estado \'En Venta\' para ejecutar la transacción. Estado Actual : ' + medicina.state);
            }
            if(medicina.owner !== 'Vendedor'){
                throw new Error(medicineNumber +' Debe tener propietatio \'Vendedor\' para ejecutar la transacción. Propietario Actual : ' + medicina.owner);
            }
        
            medicina.owner = 'Cliente';
            medicina.state = 'Vendido';
                
    
            //Update Medicine
            
            await ctx.stub.putState(medicineNumber, Buffer.from(JSON.stringify(medicina)));
            allResults.push( JSON.stringify(medicina));
            
        }
        console.info(allResults);
        return ('successful');
    
    }

}

module.exports = Medicine;

