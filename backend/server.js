const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


//eventually this should be removed due to security issues but while testing I'll leave it
mongoose.connect("mongodb+srv://michaelsault:70OByv77QoUUlQLb@cluster0.rrfulxt.mongodb.net/?retryWrites=true&w=majority").catch(err => console.log(err));

// Test connection
mongoose.connection.once('open', function () {
    console.log('MongoDB database connection established successfully')
});

//schemas
const userSchema = new Schema({
    name: String,
    email: String
});

const Users = mongoose.model("Users", userSchema);


// API
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/getUsers', (req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
});

app.post('/newUser', (req, res) => {
    console.log("user.js reached");
    console.log(req.body);

    Users.create({email: req.body.email, name: req.body.username})
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});