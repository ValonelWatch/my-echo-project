// scripts/deployEchoContract.ts
import { compile } from '@ton/blueprint';
import { beginCell, contractAddress, toNano } from '@ton/core';
import type { NetworkProvider } from '@ton/blueprint';
import { EchoContract } from '../wrappers/EchoContract';

export async function run(provider: NetworkProvider) {
  // 1) Компилируем
  const { code, data: _ } = await compile('EchoContract');
  const data = beginCell().endCell();

  // 2) Вычисляем адрес
  const address = contractAddress(0, { code, data });
  console.log('➡️  Деплой контракта по адресу', address.toString());

  // 3) Открываем провайдер + отправляем деплой
  const sender = provider.sender();
  const contract = provider.open(EchoContract.createFromAddress(address));
  await contract.sendDeploy(sender, toNano('0.05'));
  console.log('✅  Контракт задеплоен:', address.toString());
}
