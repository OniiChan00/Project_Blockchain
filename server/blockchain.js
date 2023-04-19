const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp,item,buyer,seller, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.item = item;
        this.buyer = buyer;
        this.seller = seller;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.buyer + this.seller ).toString();
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        try{
            //openfile
            const fs = require('fs');
            const data = fs.readFileSync('blockchain.json');
            const json = JSON.parse(data).chain;
            //onsole.log("loading blockchain.json")
            //console.log(json)
            return json;
        }
        catch(err){
            console.log("creating new blockchain")
            return new Block(0, "01/01/2017", "Genesis block", "0", "0");
        }

    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;








