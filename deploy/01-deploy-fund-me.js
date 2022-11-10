// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig
const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const verify = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")

// Version 1
// function deployFunc(hre) {
//     console.log("Hi")
//     // => hre.getNameAccounts
//     // => hre.deploments
// }
// module.exports.default = deployFunc

// Version 2
// module.exports = async (hre) => {
//     // => hre.getNameAccounts
//     // => hre.deploments
//     const { getNameAccounts, deploments } = hre
// }

// Version 3
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")

    // when we going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put pricefeed Address
        log: true,
        // give the Ether-chain the chance to index our contract
        waitConfirmations: network.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(
            fundMe.address, // contract-address
            args // put pricefeed Address
        )
    }

    log("----------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
