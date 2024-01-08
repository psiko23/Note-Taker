const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const api = require('./routes/router');

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/api', api);


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile((path.join(__dirname, 'public/index.html')), 'utf-8')
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});