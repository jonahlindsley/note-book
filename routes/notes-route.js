
const router = require('express').Router();
const fs = require('fs')
const path = require('path')

function getNoteData(){
    // adding promises after fs turns it into a promis obj without all the bs
    return fs.promises.readFile(path.join(__dirname, '../db/db.json'), 'utf8')
    .then(data =>  JSON.parse(data) )
    
    //   res.json(JSON.parse(data))
    

}


router.get('/notes', (req, res) => {

})

router.get('/api/notes', (req, res) => {
    getNoteData()
    // console.log(getTodoData())
    // the .then startement is passing the resolved and parsed information from the promise req in the getTodoData function
    .then(note_data => {
        // console.log(todo_data)
        res.json(note_data)
    })
    .catch(err => console.log(err))
})

// request comes first then the response after
router.post('/api/notes', (req, res) => {
    // fs.writeFile()
res.json({
    message: 'note received!'
})
})





module.exports = router;