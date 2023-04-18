var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
let Blockchain = require('./blockchain.js');
let trade_transaction = new Blockchain();
let Block = require('./block.js');




require('dotenv').config();



const app = express();
app.use(cors());

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true })


const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE
  })




app.get('/', function (req, res, next) {
    res.send("Hello World!");
});



app.post('/login',urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    pool.query(sql, [username,password], (err, result) => {
       if(result.length > 0){
              res.json(result);
              console.log(1);
       }
         else{
            res.json("0");
            console.log(0);
            }
    });
});


app.post('/register',urlencodedParser, (req, res) => {
    console.log(req);
    const username = req.body.username;
    const password = req.body.password;
    const sql = "INSERT INTO user (username, password, money) VALUES (?, ? , 1000)";
    //insert to database
    pool.query(sql, [username,password], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err.sqlState);
        }
        else {
        res.send(result);
        }
    });

}   );


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user";
    pool.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.send(err.message);
        }
        else {
        res.send(result);
        }
    });
});



app.post('/inventory',urlencodedParser, (req, res) => {
    const username = req.body.username;
    console.log(req);
    const sql = "SELECT inventory FROM user_inventory WHERE username = ?";
    pool.query(sql, [username], (err, result) => {
         if(result.length > 0){
                  res.send(result[0].inventory);
         }
            else{
                res.send("No inventory found Please login");
                }
     });
});



app.post('/updateInventory',urlencodedParser, (req, res) => {
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


app.post('/updateMoney',urlencodedParser, (req, res) => {
    const username = req.body.username;
    const money = req.body.money;
    const sql = "UPDATE user SET money = ? WHERE username = ?";
    pool.query(sql, [money,username], (err, result) => {
        if(err){
            console.log(err);
            res.send(err.sqlState);
        }
        res.send("Money updated");
        });
});


app.post('/market_ex_insert',urlencodedParser, (req, res) =>  {
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

  app.post('/deleteItem', (req, res) => {
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

  

  app.get('/market_ex', (req, res) => {
    const sql = "SELECT * FROM market_ex WHERE state = 'รอคำสั่งซื้อ'";
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error retrieving data");
      } else {
        res.send(result);
      }
    });
  });

  app.post('/market_ex_update', (req, res) => {
    const date_buy = req.body.date_buy;
    const buyer = req.body.buyer;
    const itemid  = req.body.itemid;
    const seller = req.body.seller;
    const itemname = req.body.itemname;
    const props = req.body.props;
    const sql = "UPDATE market_ex SET state = 'ขายแล้ว', buyer = ?, date_buy = ? WHERE itemid = ? AND seller = ?";
    pool.query(sql, [buyer, date_buy, itemid, seller], (err, result) => {
      if (err) {
        console.log(err);   
      } else {
        console.log(result);
      }
    });
    let index = trade_transaction.chain.length;
    let block = new Block(index, date_buy, itemname,itemid ,buyer, seller);
    trade_transaction.addBlock(block);

    //update inventory
    let sql2 = "SELECT inventory FROM user_inventory WHERE username = ?";
    pool.query(sql2, [buyer], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let inventory = result[0].inventory;
        let new_inventory = JSON.parse(inventory);
        //set new item position
        let itempos = new_inventory.length;
        //set new item id randomly
        let itemid = Math.floor(Math.random() * 1000000000);
        let new_item = {
          itempos: itempos,
          itemid: itemid,
          name: itemname,
          price : props.price,
          image: props.image,
        };
        new_inventory.push(new_item);
        //update index
        for (let i = 0; i < new_inventory.length; i++) {
          new_inventory[i].itempos = i;
        }
        let new_inventory_string = JSON.stringify(new_inventory);
        let sql3 = "UPDATE user_inventory SET inventory = ? WHERE username = ?";
        pool.query(sql3, [new_inventory_string, buyer], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      }
    });

    //remove item from seller
    let sql4 = "SELECT inventory FROM user_inventory WHERE username = ?";
    pool.query(sql4, [seller], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let inventory = result[0].inventory;
        let new_inventory = JSON.parse(inventory);
        for (let i = 0; i < new_inventory.length; i++) {
          if (new_inventory[i].itempos === props.itempos && new_inventory[i].itemid === itemid) {
            new_inventory.splice(i, 1); 
          }
        }
        //update index
        for (let i = 0; i < new_inventory.length; i++) {
          new_inventory[i].itempos = i;
        }
        let new_inventory_string = JSON.stringify(new_inventory);
        let sql5 = "UPDATE user_inventory SET inventory = ? WHERE username = ?";
        pool.query(sql5, [new_inventory_string, seller], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      }
    });
    res.send(trade_transaction.chain[index].hash);
  });
  

  app.post('/checkblock',(req, res) => {
    const hash = req.body.hash;
    trade_transaction.chain.forEach(block => {
     if (block.hash === hash) {
        res.send(block);
      }
    });
    res.send("not found");
  });


  app.get('/blockchain', (req, res) => {
    res.send(trade_transaction.chain);
  });

  

    

  

  






app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));






app.listen(5000, function () {
    console.log('web server listening on port 5000')
})





