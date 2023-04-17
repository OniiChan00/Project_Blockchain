var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


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
            res.send(inventory)
        });
});




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





app.listen(5000, function () {
    console.log('web server listening on port 5000')
})





