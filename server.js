const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'store'
  });

  con.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
  })

 

app.prepare()
    .then(() => {
        const server = express()
        var router = express.Router();
        server.use('/api',  router)
        server.use('/public', express.static(__dirname + '/public'));

        // server.get('/favicon.ico', (req, res) => res.status(204));


        router.get('/products', (req,res) =>{
                con.query("SELECT * FROM products WHERE NAME='gialo' OR  NAME='fridge'", function (err, result, fields) {
                  if (err) throw err;
                  res.send(result)
                });
        })

        server.get('*', (req,res) =>{
            return handle(req,res)
        })

        server.listen(3001, err => {
            if (err) {
                throw err
            }

            console.log(`> Ready on http://localhost:${3001}`)
        })
    })