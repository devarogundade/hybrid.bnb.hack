const Hybrid = artifacts.require('Hybrid');
const SimpleSwap = artifacts.require('SimpleSwap');
const WrappedBNB = artifacts.require('WrappedBNB');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Hybrid);
    await deployer.deploy(WrappedBNB, Hybrid.address);
    await deployer.deploy(SimpleSwap, WrappedBNB.address);
};