import { toNano, contractAddress, beginCell, Cell } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { EchoContract } from '../wrappers/EchoContract';
import { compile } from '@ton/blueprint';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export async function run(provider: NetworkProvider) {
    console.log('--- 🚀 DEPLOY START ---');

    const sender = provider.sender();
    const senderAddr = sender.address?.toString();
    if (!senderAddr) {
        console.error('❌ Sender address is undefined');
        return;
    }
    console.log('👤 Sender address:', senderAddr);

    const compiledPath = resolve(__dirname, '../build/EchoContract.compiled.json');
    const compiled = JSON.parse(readFileSync(compiledPath, 'utf8'));

    const codeCell = Cell.fromBoc(Buffer.from(compiled.hex, 'hex'))[0];
    const dataCell = new Cell(); // Если без инициализации

    const address = contractAddress(0, { code: codeCell, data: dataCell });
    console.log('📬 Future contract address:', address.toString());

    const contract = provider.open(
        new EchoContract(address)
    );

    await contract.sendDeploy(sender, toNano('0.05'));

    console.log('✅ Contract deployed!');
    console.log('🌐 Explorer link: https://testnet.tonviewer.com/' + address.toString());
}
