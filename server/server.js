const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 5000;
const UPDATE_JSON_FILE = path.join(__dirname, '/js.json');
const UPDATE_JSON_ENDPOINT = '/api/updateJson';

const server = express();
server.use(cors());
server.use(express.static("/server"));

const rawParser = bodyParser.raw({type: "*/*"});
const jsonParser = bodyParser.json({limit: '1000kb'});

server.get('/js', (req, res) => {
    const data = fs.readFileSync(UPDATE_JSON_FILE, (err, result) => {
        console.log('Request was received');
        if (err) {
            console.log('Error with the reading process');
        }
        return result;
    });
    const newData = JSON.stringify(data.toString());
    res.send(newData);
});
server.post(UPDATE_JSON_ENDPOINT, rawParser, (req, res) => {
    const data = req.body;
    fs.writeFile(UPDATE_JSON_FILE, data, (err) => {
        if (!err) {
            console.log('Success updating');
            res.status(200).send('Success');
        } else {
            console.log(err.toString());
            res.status(500).send('There is trouble', err.toString());
        }
    });
});
server.get(UPDATE_JSON_ENDPOINT, (req, res) => {
    res.status(400).send('For POST requests only!');
});

server.listen(PORT);