const pool = require('../connect/db');

const getUserInventory = (username) => {
    const sql = "SELECT * FROM user_inventory WHERE username = ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, [username], (err, result) => {
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
};

module.exports = getUserInventory;
