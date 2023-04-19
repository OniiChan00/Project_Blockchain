const pool = require('../connect/db');
const update_money = (req) => {
    const sql = 'UPDATE user SET money = ? WHERE username = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [req.body.money, req.body.username], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                //console.log(result);
                resolve("update money success");
            }
        });
    }
    );
}
module.exports = update_money;
