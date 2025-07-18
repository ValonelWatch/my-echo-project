// wrappers/EchoContract.ts
import {
  Address,
  Cell,
  beginCell,
  Contract,
  ContractProvider,
  Sender,
  SendMode
} from '@ton/core';

export class EchoContract implements Contract {
  readonly address: Address;

  constructor(address: Address) {
    this.address = address;
  }

  static createFromAddress(address: Address) {
    return new EchoContract(address);
  }

  /** Привязка провайдера вызывается автоматически blueprint’ом */
  __setProvider(provider: ContractProvider) {
    this.provider = provider;
  }
  private provider!: ContractProvider;

  /** Отправляем сообщение без тела (деплой) */
  async sendDeploy(via: Sender, value: bigint) {
    await this.provider.external(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
      value
    });
  }

  /** Отправляем текстовое сообщение контракту */
  async sendMessage(via: Sender, text: string) {
    const body = beginCell()
      .storeBuffer(new TextEncoder().encode(text))
      .endCell();
    await this.provider.external(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body,
      value: BigInt(1_000_000) // 0.001 TON
    });
  }
}
