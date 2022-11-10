const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log(developmentChains.toString())
    log("chainId", chainId)
    log("deployer", deployer)
    // if (developmentChains.includes(network.name)) {
    if (chainId == 31337) {
        log(`Local network detected! Deploying mock (${network.name})...`)
        contractName = "MockV3Aggregator"
        await deploy(contractName, {
            contract: contractName,
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mock deployed!")
        log("--------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
