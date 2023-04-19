const pool = require('../connect/db');
const user_inventory = require('../user/user_inventory');
const update_inventory = require('../user/update_user_inventory');
//test for user_inventory
let user = "tree";
(async () => {
    let inventory = await user_inventory(user);
    console.log(inventory[0].inventory);

    let update = await update_inventory(user);
    console.log(update);
    
  })();




