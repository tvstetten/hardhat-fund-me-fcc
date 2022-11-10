const networkConfig = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "NETWORK IS OFFLINE",
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "NETWORK IS OFFLINE",
    },
    5: {
        // Goerli ETH / USD Address
        // https://docs.chain.link/docs/ethereum-addresses/
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 2000 * 10 ** DECIMALS

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }
