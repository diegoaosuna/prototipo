/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,'..', '..', '..','..', 'connectionOrg4.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

exports.main = async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve('/prototipo/medicine-client/client/apps/wallet-org4');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user');
        if (userExists) {
            console.log('An identity for the user "user" already exists in the wallet-org4');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet-org4');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();


        // Register the user, enroll the user, and import the new identity into the wallet.
	let affiliationService = ca.newAffiliationService();

        let registeredAffiliations = await affiliationService.getAll(adminIdentity);
        if(!registeredAffiliations.result.affiliations.some(x => x.name == 'org4')){
	let affiliation = 'org4.department1'; 
        await affiliationService.create({
            name: affiliation, 
            force: true}, adminIdentity);
        }
        const secret = await ca.register({ affiliation: 'org4.department1', enrollmentID: 'user', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'user', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org4MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('user', userIdentity);
        console.log('Successfully registered and enrolled admin user "user" and imported it into the wallet-org4');

    } catch (error) {
        console.error(`Failed to register user "user": ${error}`);
        process.exit(1);
    }
}


