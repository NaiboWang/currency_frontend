import Web3 from "web3";
async function getRate() {
    // const Web3 = require('web3');
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
    const tokenAddresses = {
        "bep20_wbnb": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "bep20_btc": "0x6ce8da28e2f864420840cf74474eff5fd80e65b8",
        "bep20_eth": "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
        "bep20_usdt": "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
        "bep20_xrp": "0xa83575490d7df4e2f47b7d38ef351a2722ca45b9"
    };
    const pancakeRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
    const abi_pancakeRouter = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                }
            ],
            "name": "getAmountsOut",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    let swap_path = [tokenAddresses['bep20_usdt'], tokenAddresses['bep20_wbnb'],tokenAddresses["bep20_xrp"]];
    let rate_contract = new web3.eth.Contract(abi_pancakeRouter, pancakeRouter);
    let amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    // console.log(amountsOut[0]/amountsOut[1],amountsOut[0]/amountsOut[2]);
    let prices = [];
    prices["BNB"] = amountsOut[0]/amountsOut[1];
    prices["XRP"] = amountsOut[0]/amountsOut[2];
    swap_path = [tokenAddresses["bep20_wbnb"],tokenAddresses["bep20_btc"]];
    amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    prices["BTC"] = amountsOut[0] / amountsOut[1] * prices["BNB"];
    swap_path = [tokenAddresses["bep20_wbnb"],tokenAddresses["bep20_eth"]];
    amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    prices["ETH"] = amountsOut[0] / amountsOut[1] * prices["BNB"];
    return prices;
}

export default getRate;
