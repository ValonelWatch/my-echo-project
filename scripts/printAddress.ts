import fs from 'fs';
import path from 'path';
import { Cell, beginCell, contractAddress } from '@ton/core';

// Когда вы уже скомпилировали контракт (npm run build)
async function main() {
  const artPath = path.resolve(__dirname, '../build/EchoContract.compiled.json');
  const art = JSON.parse(fs.readFileSync(artPath, 'utf8'));
  const codeCell = Cell.fromBoc(Buffer.from(art.hex, 'hex'))[0];
  const dataCell = beginCell().endCell();

  // Передаём workchain=0 и объект init
  const addr = contractAddress(0, { code: codeCell, data: dataCell });
  console.log('📍 EchoContract address:', addr.toString());
}

main().catch(console.error);
