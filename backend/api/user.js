const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/User');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Users = mongoose.model("Users", userSchema);

router.get('/', (req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    console.log("user.js reached");
    const { name, email } = req.body;
    const newUser = new User({
        name: name, email: email
    })
    newUser.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }));
});
module.exports = router 