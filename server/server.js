const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let contacts = [
    {
        createdDate: Date.now(),
        email: 'xyz@gmail.com'
    },
];

// Get all contacts
app.get('/contacts', (req, res) => {
    res.json(contacts);
});


// Create a new Contact
app.post('/contacts', (req, res) => {
    const newContact = req.body;
    newContact.createdDate = Date.now();
    contacts.push(newContact);
    res.status(201).json(newContact);
});


// Delete a Contact
app.delete('/contacts/:createdDate', (req, res) => {
    const createdDate = parseInt(req.params.createdDate);
    const index = contacts.findIndex(element => element.createdDate === createdDate);

    if (index !== -1) {
        const deletedItem = contacts.splice(index, 1)[0];
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});