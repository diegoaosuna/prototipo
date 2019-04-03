'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,'..', '..', '..','..', 'connectionOrg3.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

exports.main = async function main(org) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath  = '/prototipo/medicine-client/client/apps/wallet-org3';
	const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet-org3');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('prototipochannel');

        // Get the contract from the network.
        const contract = network.getContract('medicine-contract');

        // Evaluate the specified transaction.
        // queryByOrg transaction - requires 1 argument, ex: ('queryByOrg', 'Tranportador')
        const result = await contract.evaluateTransaction('queryByOrg','Transportador');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error;
	// process.exit(1);
    }
}
