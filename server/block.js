const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp,item,item_id,buyer,seller, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.item = item;
        this.buyer = buyer;
        this.seller = seller;
        this.item_id = item_id;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.buyer + this.seller ).toString();
    }
}

module.exports = Block;
