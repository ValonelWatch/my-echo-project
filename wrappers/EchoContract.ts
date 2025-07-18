import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode } from '@ton/core';

export class EchoContract implements Contract {
    constructor(readonly address: Address) {}

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        const body = beginCell()
            .storeUint(0, 32)
            .storeStringTail("echo")
            .endCell();

        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body
        });
    }
}
