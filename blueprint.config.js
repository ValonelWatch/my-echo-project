/** blueprint.config.js */
module.exports = {
  contracts: {
    // Ключ — имя контракта, по нему же он будет спрашиваться в `blueprint build`
    EchoContract: 'contracts/EchoContract.contract.fc'
  },
  wrappers: {
    // Ключ тот же, что и в contracts
    EchoContract: 'wrappers/EchoContract.ts'
  },
  scripts: {
    // Имя скрипта, которым мы будем вызывать деплой: `npx blueprint run deployEchoContract`
    deployEchoContract: 'scripts/deployEchoContract.ts'
  }
};
