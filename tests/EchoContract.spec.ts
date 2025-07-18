import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { EchoContract } from '../wrappers/EchoContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('EchoContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('EchoContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let echoContract: SandboxContract<EchoContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        echoContract = blockchain.openContract(EchoContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await echoContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: echoContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and echoContract are ready to use
    });
});
