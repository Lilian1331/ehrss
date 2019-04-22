const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash = "" ){
        console.log("Start the new object of bloxk");
        console.log(index + " " + " " + timestamp + " " + data + " " );
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2019","Genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
module.exports.Blockchain = Blockchain;
