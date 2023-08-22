const express = require('express')
const connection = require ('./db.js')

connection()
const app = express()
const port = 5000

// Middleware
app.use(express.json())

// Available Routes

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () =>{
    console.log('listening on port')
})
