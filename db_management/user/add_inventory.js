const pool = require('../connect/db');
const add_inventory = (username,inventory) => {
    const sql = 'INSERT INTO user_inventory (username, inventory) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        pool.query(sql, [username, inventory], (err, result) => {
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
module.exports = add_inventory;