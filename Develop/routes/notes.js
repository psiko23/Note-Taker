const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const notesRouter = express.Router();

const filePath = '../Develop/db/db.json';

notesRouter.get('/', (req, res) => {
    // const filePath = path.join(__dirname, '..db/db.json');
    console.log(`${req.method} received successfully!`);
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

notesRouter.post('/', (req,res) => {
    console.log(`${req.method} request received successfully!`);
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

notesRouter.delete('/:id', (req, res) => {
    console.log(`${req.method} request received`);
    const noteID = req.params.id;
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw new Error('Error reading file');
        }
    const savedNotes = JSON.parse(data);
    // filters the note IDs in search of the note looking to be deleted, then creates a new array of notes
        // if note.id !== noteID, then the test passes, and is added to the array
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

module.exports = notesRouter;