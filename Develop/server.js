const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// const api = require('./routes/router.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
// app.use('/api', api);


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    console.log(`${req.method} received successfully!`);
    const filePath = path.join(__dirname, 'db/db.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            console.log(`Internal server error: `, err);
            return
        } else {
            data = JSON.parse(data);
            res.json(data);
        }
    })
})

app.post('/api/notes', (req,res) => {
    // console.log(`${req.method} request received successfully!`);
    const filePath = path.join(__dirname, 'db/db.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw new Error('Error reading file');
        } 
        
        const savedNotes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuidv4();
        console.log(newNote);
        savedNotes.push(newNote);

        fs.writeFile(filePath, JSON.stringify(savedNotes), (err) => {
            if (err) {
                console.log('error posting note: ', err)
            }
            console.log('note saved successfully');
            res.json(newNote);
        }); 
    });
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received`);
    const noteID = req.params.id;

    const filePath = path.join(__dirname, 'db/db.json');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw new Error('Error reading file');
        }
    const savedNotes = JSON.parse(data);
    const newArr = savedNotes.filter(note => note.id !== noteID);
    fs.writeFile(filePath, JSON.stringify(newArr), (err) => {
        if (err) {
            console.log('error writing note object')
        }
        console.log('note deleted successfully');
        res.json(newArr)
        })
    })
})

app.get('*', (req, res) => {
    res.sendFile((path.join(__dirname, 'public/index.html')), 'utf-8')
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});