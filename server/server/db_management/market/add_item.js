const pool = require('../connect/db');
const add_item = (req) => {
    const state = "รอคำสั่งซื้อ";
    let sql = 'INSERT INTO market_ex (image, itempos, itemid, item_name, price, state, buyer, seller, date_sale, date_buy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        pool.query(sql, [req.body.image, req.body.itempos, req.body.itemid, req.body.item_name, req.body.price, state, , req.body.seller, req.body.buyer, req.body.date_sale, req.body.date_buy], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                //console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = add_item;