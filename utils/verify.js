const { run } = require("hardhat")

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args, // []
        })
    } catch (e) {
        if (e.message == "Contract source code already verified") {
            console.log(e.message)
        } else {
            console.log(e)
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!")
            }
            process.exit(2)
        }
    }
}

module.exports = verify
