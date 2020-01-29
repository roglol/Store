const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()




app.prepare()
    .then(() => {
        const server = express()
        server.use('/public', express.static(__dirname + '/public'));

        // server.get('/favicon.ico', (req, res) => res.status(204));
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