const express = require('express');
const Mongo = require('mongoose');
const React = require('react');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// database
Mongo.connect("mongodb://mongo:27017/app", {
    useNewUrlParser: "true",
});
Mongo.connection.on("error", err => {
    console.log("err", err);
});
Mongo.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse json
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname, '../build')));

// get routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../build/index.html');
});

// post routes
const UserController = require('./objects/user.controller');
app.get('/users', UserController.getUsers);
app.post('/adduser', UserController.addUser);

// listen
app.listen(5000, () => {
    console.log('Server started at 5000');
});
