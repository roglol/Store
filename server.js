const next = require('next')
const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()




app.prepare()
    .then(() => {
        const server = express()
        var router = express.Router();
        server.use('/api',  router)
        server.use('/public', express.static(__dirname + '/public'));

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