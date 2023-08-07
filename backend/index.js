const connection = require ('./db.js')
const express = require('express')

connection()
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Available Routes

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () =>{
    console.log('listening on port')
})
