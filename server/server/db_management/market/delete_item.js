const pool = require('../connect/db');
const deleteItem = (req) => {
    const sql = "DELETE FROM market_ex WHERE itemid = ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, [req.body.itemid], (err, result) => {
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
module.exports = deleteItem;