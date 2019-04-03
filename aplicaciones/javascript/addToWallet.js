/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '/prototipo');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/org1.prototipo.com/users/User1@org1.prototipo.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@org1.prototipo.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/2106aa727a1c8ad5ad4ed57ce4d478c736366292d44c02dd5fb589b276409688_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@org1.prototipo.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
