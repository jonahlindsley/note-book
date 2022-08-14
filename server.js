// const connection = require('./config/db-connection')
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3006;
const app = express()
const notes_route = require('./routes/notes-route')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json)

app.use('/', notes_route)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
