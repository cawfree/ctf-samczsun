/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x2a39a21c0e763f647b7805f362d98a3748e36a65a9aaaf1ed1b9fc5fe0ea1753","balance":"1000000000000000000000"},{"privateKey":"0x3c4f3bb59f47d38345bda1720982e35df631fdd560bd559190b8501272421bdc","balance":"1000000000000000000000"},{"privateKey":"0x45d852e15bc3ad8ffbbceaf3376365bf416f1af888df71f29fb49f36f109b9b4","balance":"1000000000000000000000"},{"privateKey":"0x6c0db5305fa1110b22d8936dd633a29ec71512ccaeb951bc7361a3665cdde0c4","balance":"1000000000000000000000"},{"privateKey":"0x1205ccf04cc08d79eeb1dde9cc9cf6d2208f4b1a25ef6eb20714e4c523ae0253","balance":"1000000000000000000000"},{"privateKey":"0x05cc01c1e6c8b8c006de7e15e5317c5c40be0e13107d5405effe9ea426fbf689","balance":"1000000000000000000000"},{"privateKey":"0xa49ead29ebba4d036721cab7454300614d44f131bb550929c7d6d99043606d50","balance":"1000000000000000000000"},{"privateKey":"0x445c4657f35cd5a336e7adabd9b460199b4ef02b7eea4466e7bd19663920ae63","balance":"1000000000000000000000"},{"privateKey":"0x1e4b951a57a351a6bacfdb2b145dae974cff8a42dc4796c5f9520df10c40d518","balance":"1000000000000000000000"},{"privateKey":"0x0a20c44eceab73eba75f6c6e6b4d8f314516206ea1db371112c8dde5dc335509","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};