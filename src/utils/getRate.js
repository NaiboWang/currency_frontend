import Web3 from "web3";
async function getRate() {
    // const Web3 = require('web3');
    let web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
    // web3 = new Web3("https://bsc-dataseed1.binance.org:443")
    let tokenAddresses = {
        "bep20_wbnb": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "bep20_btc": "0x6ce8da28e2f864420840cf74474eff5fd80e65b8",
        "bep20_eth": "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
        "bep20_usdt": "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
        "bep20_xrp": "0xa83575490d7df4e2f47b7d38ef351a2722ca45b9"
    };
    // tokenAddresses = {
    //     "bep20_wbnb": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    //     "bep20_btc": "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    //     "bep20_eth": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    //     "bep20_usdt": "0x55d398326f99059ff775485246999027b3197955",
    //     "bep20_xrp": "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe"
    // };
    let pancakeRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
    // pancakeRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
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
    let swap_path = [tokenAddresses['bep20_usdt'], tokenAddresses['bep20_wbnb']];
    let rate_contract = new web3.eth.Contract(abi_pancakeRouter, pancakeRouter);
    let amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    // console.log(amountsOut[0]/amountsOut[1],amountsOut[0]/amountsOut[2]);
    let prices = [];
    prices["BNB"] = amountsOut[0]/amountsOut[1];
    swap_path = [tokenAddresses['bep20_usdt'],tokenAddresses["bep20_xrp"]];
    amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    prices["XRP"] = amountsOut[0]/amountsOut[1];
    swap_path = [tokenAddresses["bep20_wbnb"],tokenAddresses["bep20_btc"]];
    amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    prices["BTC"] = amountsOut[0] / amountsOut[1] * prices["BNB"];
    swap_path = [tokenAddresses["bep20_wbnb"],tokenAddresses["bep20_eth"]];
    amountsOut = await rate_contract.methods.getAmountsOut(web3.utils.toHex(1e18), swap_path).call();
    prices["ETH"] = amountsOut[0] / amountsOut[1] * prices["BNB"];
    // console.log(prices)
    return prices;
}

export default getRate;
