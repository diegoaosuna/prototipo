'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,'..', '..', '..','..', 'connectionOrg2.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

exports.main = async function main(list) {
    try {

        // Create a new file system based wallet for managing identities.
	const walletPath  = '/prototipo/medicine-client/client/apps/wallet-org2';        
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user');
        if (!userExists) {
            console.log('An identity for the user "user" does not exist in the wallet-org2');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('prototipochannel');

        // Get the contract from the network.
        const contract = network.getContract('medicine-contract');

        // Evaluate the specified transaction.
        // txnEnviarListaMedicinas transaction - requires 1 argument, ex: ('txnEnviarListaMedicinas', '[01,02]')
        const result = await contract.submitTransaction('txnEnviarListaMedicinas',list);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error;
	// process.exit(1);
    }
}
