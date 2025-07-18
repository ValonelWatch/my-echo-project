// scripts/printAddress.ts
import { compileSync } from '@ton/blueprint';
import { beginCell, contractAddress } from '@ton/core';

(async () => {
  const { code } = await compileSync('EchoContract');
  const data = beginCell().endCell();
  const addr = contractAddress(0, { code, data });
  console.log('📍 EchoContract address:', addr.toString());
})();
