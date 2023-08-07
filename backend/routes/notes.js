const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router()


router.post('/',  (req, res) => {
    console.log(req.body)
    const notes = Notes(req.body)
    notes.save()
    res.send(req.body)

})


module.exports = router