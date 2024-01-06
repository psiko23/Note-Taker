const express = require('express');
const path = require('path');
const fs = require('fs');
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
    console.log(`${req.method} request received successfully!`);
    const filePath = path.join(__dirname, 'db/db.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw new Error('Error reading file');
        } 
        const savedNotes = data;
        console.log(savedNotes);
        
    })
})

app.get('*', (req, res) => {
    res.sendFile((path.join(__dirname, 'public/index.html')), 'utf-8')
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});