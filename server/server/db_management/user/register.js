const pool = require('../connect/db');
const register = (req) => {
    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        pool.query(sql, [req.body.username, req.body.password], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                //console.log(result);
                resolve("1");
            }
        });
    });
}
module.exports = register;