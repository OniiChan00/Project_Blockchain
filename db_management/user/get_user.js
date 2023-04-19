const pool = require('../connect/db');
const get_user = (req) => {
    const sql = 'SELECT * FROM user ';
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
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
module.exports = get_user;