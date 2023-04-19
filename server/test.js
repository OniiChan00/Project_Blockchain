//test blockchain
let Blockchain = require('./blockchain.js');
let trade_transaction = new Blockchain();

//test block
let Block = require('./block.js');
let block = new Block(1, "01/01/2017", "item", "buyer", "seller");




//test add block
trade_transaction.addBlock(block);
console.log(trade_transaction.isChainValid());
console.log(JSON.stringify(trade_transaction, null, 4));