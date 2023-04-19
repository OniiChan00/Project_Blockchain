const pool = require('../connect/db');
const login = (req) => {
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [req.body.username, req.body.password], (err, result) => {
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
module.exports = login;