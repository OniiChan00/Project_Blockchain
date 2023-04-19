//random item form csgo_item.json

const SHA256 = require("crypto-js/sha256");
const item = require('./csgo_item.json')

const random = () => {
    let randomItems = []
    let randomItemsNumber = Math.floor(Math.random() * 100)

    for (let i = 0; i < randomItemsNumber; i++) {
        let random = Math.floor(Math.random() * item.length)
        randomItems.push(item[random])
        randomItems[i].itemid = SHA256(randomItems[i].name + randomItems[i].price + randomItems[i].image + i).toString()
        randomItems[i].itempos = i
    }

    return randomItems
}

module.exports = random