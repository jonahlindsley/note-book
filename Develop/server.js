
const express = require('express');
const db = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3333;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// main routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
// api routes
app.get('/api/notes', (req, res) => {
    res.json(db.slice(1))
})
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, db)
    res.json(newNote)
})
const createNote = (body, notes_array) => {
    const newNote = body
    if (!Array.isArray(notes_array)){
        notes_array = []
    }
    if (notes_array === 0 ){
        notes_array.push(0)
    }
    body.id = notes_array.length
    notes_array[0]++
    notes_array.push(newNote)

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes_array, null, 2)
    )
    return newNote
}
app.delete('/api/notes/:id', (req, res) => {
    deleteNotes(req.params.id, db)
    res.json(true)
})
const deleteNotes = (id, notes_array) =>{
for (let i= 0; i < notes_array.length; i++) {
   let note = notes_array[i]
   if (note.id == id){
    notes_array.splice(i, 1)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes_array, null, 2)
        );
        break
   }
    
}
}


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
