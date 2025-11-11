const express = require('express');
const path = require('path');
const logger = require('morgan');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from 'public' folder
server.use(express.static(path.join(__dirname, 'lab-7')));

// POST handler for Mad Lib submission
server.post('/submit', (req, res) => {
    const { astronaut, planet, alien, vehicle, adjective } = req.body;

    if (!astronaut || !planet || !alien || !vehicle || !adjective) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
    Captain ${astronaut} embarked on a daring mission to ${planet}. 
    Along the way, they encountered a ${adjective} ${alien} who offered to ride in their ${vehicle}. 
    Together, they explored the galaxy and discovered wonders beyond imagination!
    `;

    res.send(`
        <h1>Space Adventure Mad Lib</h1>
        <p>${madLib}</p>
        <a href="/">Go Back to Form</a>
    `);
});

// Set port
const port = process.argv[2] === 'local' ? 8080 : 80;
server.listen(port, () => console.log(`Server running on port ${port}`));




