const next = require('next')
const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PDO = require('pdo')
const db = new PDO()
var dsn = "mysql:host='localhost';dbname='store';charset='utf8mb4'";

var pdo = db.open(dsn,'root','123456');


app.prepare()
    .then(() => {
        const server = express()
        var router = express.Router();
        server.use('/api',  router)
        server.use('/public', express.static(__dirname + '/public'));

        // server.get('/favicon.ico', (req, res) => res.status(204));


        router.get('/products', async (req,res) =>{
            await db.open(dsn);
            let response = db.query(
                `
    SELECT *
    FROM products
            `)
            await db.close();
            res.send(response)
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