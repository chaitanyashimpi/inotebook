const connection = require ('./db.js')
const express = require('express')

connection()
const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.listen(port, () =>{
    console.log('listening on port')
})
