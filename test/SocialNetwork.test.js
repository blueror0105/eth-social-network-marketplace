const { assert } = require('chai');

const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('SocialNetwork', (accounts) => {
    let socialnetwork;

    before(async () => {
        socialnetwork = await SocialNetwork.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await socialnetwork.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        });

        it('has a name', async () => {
            const name = await socialnetwork.name();
            assert.equal(name, 'Dapp University Social Network')
        })
    });
})