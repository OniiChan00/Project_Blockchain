const pool = require('../connect/db');

const update_inventory = (username,inventory) => {
    const sql = "UPDATE user_inventory SET inventory = ? WHERE username = ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, [inventory,username], (err, result) => {
            if (err) {
                //console.log(err);
                reject(err);
            }
            else {
                //console.log(result);
                console.log('update inventory success')
                resolve(result);
            }
        });
    });
};

module.exports = update_inventory;
