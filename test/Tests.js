const { ethers } = require('hardhat');
const { expect } = require('chai');

describe("Tests Social Network", function() {
  before(async function() {
    [this.owner, this.addr1, this.addr2, this.addr3, ...this.addrs] = await ethers.getSigners();
  })

  it('should deploy the smart contract', async function() {
    this.contract = await hre.ethers.getContractFactory("SocialNetwork");
    this.deployedContract = await this.contract.deploy()
  })

  // it('sellingStep should equal 0 after deploying the smart contract', async function() {
  //   expect(await this.deployedContract.sellingStep()).to.equal(0);
  // })

  // it('merkleRoot should be defined and have a length of 66', async function() {
  //   expect(await this.deployedContract.merkleRoot()).to.have.lengthOf(66);
  // })

  // it('should NOT change the sellingStep if NOT THE OWNER', async function() {
  //   await expect(this.deployedContract.connect(this.addr1).setStep(1)).to.be.revertedWith('Ownable: caller is not the owner');
  // })

  // it('should set the saleStartTime', async function() {
  //   let saleStartTime = 1647772323;
  //   await this.deployedContract.setSaleStartTime(saleStartTime);
  //   expect(await this.deployedContract.saleStartTime()).to.equal(saleStartTime);
  // })

  // it('should change the step to 1 (Whitelist Sale)', async function() {
  //   await this.deployedContract.setStep(1);
  //   expect(await this.deployedContract.sellingStep()).to.equal(1);
  // })

  // it('should mint one NFT on the whitelist sale if the user is whitelisted', async function() {
  //   const leaf = keccak256(this.addr1.address);
  //   const proof = this.tree.getHexProof(leaf);

  //   let price = await this.deployedContract.wlSalePrice();

  //   const overrides = {
  //     value: price
  //   }

  //   await this.deployedContract.connect(this.addr1).whitelistMint(this.addr1.address, 1, proof, overrides);
  // })

  // it('should NOT mint one NFT on the whitelist sale if the user is  NOT whitelisted', async function() {
  //   const leaf = keccak256(this.addr3.address);
  //   const proof = this.tree.getHexProof(leaf);

  //   let price = await this.deployedContract.wlSalePrice();

  //   const overrides = {
  //     value: price
  //   }

  //   await expect(this.deployedContract.connect(this.addr3).whitelistMint(this.addr3.address, 1, proof, overrides)).to.be.revertedWith('Not whitelisted');
  // })

  // it('should get the totalSupply and the totalSupply should be equal to 1', async function() {
  //   expect(await this.deployedContract.totalSupply()).to.equal(1);
  // })

  // it('should change the step to 2 (Whitelist Sale)', async function() {
  //   await this.deployedContract.setStep(2);
  //   expect(await this.deployedContract.sellingStep()).to.equal(2);
  // })

  // it('should set the saleStartTime', async function() {
  //   let saleStartTime = 1647772323 - 30 * 60 * 60;
  //   await this.deployedContract.setSaleStartTime(saleStartTime);
  //   expect(await this.deployedContract.saleStartTime()).to.equal(saleStartTime);
  // })

  // it('should mint 3 NFTs during the public sale', async function() {
  //   //publicMint(address _account, uint _quantity)
  //   let price = await this.deployedContract.publicSalePrice();
  //   let finalPrice = price.mul(3);

  //   const overrides = {
  //     value: finalPrice
  //   }

  //   await this.deployedContract.connect(this.addr1).publicMint(this.addr1.address, 3, overrides);
  // })

})