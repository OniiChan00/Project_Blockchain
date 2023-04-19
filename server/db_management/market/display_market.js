const pool = require('../connect/db');
const display_market = (req) => {
    const state = "รอคำสั่งซื้อ";
    let sql = 'SELECT * FROM market_ex WHERE state = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [state], (err, result) => {
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
module.exports = display_market;
