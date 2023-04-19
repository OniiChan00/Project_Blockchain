var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const SHA256 = require("crypto-js/sha256");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
let Blockchain = require("./blockchain.js");
let trade_transaction = new Blockchain();
let Block = require("./block.js");

const pool = require("./db_management/connect/db.js");
const user_register = require("./db_management/user/register.js");
const user_login = require("./db_management/user/login.js");
const user_inventory = require("./db_management/user/user_inventory.js");
const add_inventory = require("./db_management/user/add_inventory.js");
const get_user = require("./db_management/user/get_user.js");
const add_item = require("./db_management/market/add_item.js");
const update_inventory = require("./db_management/user/update_inventory.js");
const display_market = require("./db_management/market/display_market.js");
const deleteItem = require("./db_management/market/delete_item.js");

const random_item = require("./random_item/random.js");


const app = express();
app.use(cors());

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get("/", function (req, res, next) {
  res.send("Hello World!");
});

app.post("/login", urlencodedParser, (req, res) => {
  (async () => {
    let login = await user_login(req);
    res.send(login);
  })();
});

app.post("/register", urlencodedParser, (req, res) => {
  (async () => {
    let register = await user_register(req);
    let inventory = JSON.stringify(random_item());
    let user_inventory = await add_inventory(req.body.username, inventory);
    res.send(register);
  })();
});


app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  pool.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err);
      res.send(err.message);
    } else {
      res.send(result);
    }
  });
});

app.post("/inventory", urlencodedParser, (req, res) => {
  const username = req.body.username;
  (async () => {
    let inventory = await user_inventory(username);
    res.send(inventory[0].inventory);
  })();
});

app.post("/updateMoney", urlencodedParser, (req, res) => {
  const username = req.body.username;
  const money = req.body.money;
  const sql = "UPDATE user SET money = ? WHERE username = ?";
  pool.query(sql, [money, username], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.sqlState);
    }
    res.send("Money updated");
  });
});

app.post("/market_ex_insert", urlencodedParser, (req, res) => {
  const image = req.body.image;
  const itemid = req.body.itemid;
  const itempos = req.body.itempos;
  const item_name = req.body.item_name;
  const price = req.body.price;
  let state = req.body.state;
  const buyer = req.body.buyer;
  const seller = req.body.seller;
  const date_sale = req.body.date_sale;
  const date_buy = req.body.date_buy;

  // insert to database
  state = "รอคำสั่งซื้อ";
  let sql = 'INSERT INTO market_ex (image, itempos, itemid, item_name, price, state, buyer, seller, date_sale, date_buy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [image, itempos, itemid, item_name, price, state, buyer, seller, date_sale, date_buy], function(err, result) {
    if (err) throw err;
    console.log(result);image
    res.send(result);
  });
});

app.post("/deleteItem", (req, res) => {
  const itemid = req.body.itemid;
  const sql = "DELETE FROM market_ex WHERE itemid = ?";
  pool.query(sql, [itemid], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

app.post("/updateInventory", urlencodedParser,(req, res) => {
  const username = req.body.username;
  const inventory = req.body.inventory;
  const sql = "UPDATE user_inventory SET inventory = ? WHERE username = ?";
  pool.query(sql, [inventory,username], (err, result) => {
      if(err){
          console.log(err);
          res.send(err.sqlState);
      }    
      res.send("Inventory updated");

      });
});

app.get("/market_ex", (req, res) => {
  (async () => {
    let market = await display_market();
    res.send(market);
  })();
});

app.post("/market_ex_update", (req, res) => {
  (async () => {
    let item = await deleteItem(req);

    //update buyer inventory
    let inventory_buyer = await user_inventory(req.body.buyer);
    let inventory_buyer_json = JSON.parse(inventory_buyer[0].inventory);
    let new_item = {
      itempos: inventory_buyer_json.length,
      itemid: SHA256(req.body.buyer + inventory_buyer_json.length).toString(),
      name: req.body.itemname,
      price: req.body.props.price,
      image: req.body.image,
    };
    inventory_buyer_json.push(new_item);
    let update = await update_inventory(
      req.body.buyer,
      JSON.stringify(inventory_buyer_json)
    );

    //update seller inventory
    let inventory_seller = await user_inventory(req.body.seller);
    let inventory_seller_json = JSON.parse(inventory_seller[0].inventory);
    let index = inventory_seller_json.findIndex(
      (item) => item.itemid === req.body.itemid
    );
    inventory_seller_json.splice(index, 1);
    inventory_seller_json.forEach((item, i) => {
      item.itempos = i;
    });
    update = await update_inventory(
      req.body.seller,
      JSON.stringify(inventory_seller_json)
    );
  })();

  const date_buy = req.body.date_buy;
  const buyer = req.body.buyer;
  const itemid = req.body.itemid;
  const seller = req.body.seller;
  const itemname = req.body.itemname;
  let index = trade_transaction.chain.length;
  let block = new Block(index, date_buy, itemname, itemid, buyer, seller);
  trade_transaction.addBlock(block);
  
  res.send(trade_transaction.chain[index].hash);
});




app.post("/checkblock", (req, res) => {
  const hash = req.body.hash;
  trade_transaction.chain.forEach((block) => {
    if (block.hash === hash) {
      res.send(block);
    }
  });
  res.send("not found");
});

app.get("/blockchain", (req, res) => {
  res.send(trade_transaction.chain);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, function () {
  console.log("web server listening on port 5000");
});
