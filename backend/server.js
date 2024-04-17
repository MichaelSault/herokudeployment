const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvp = require('./rsvp.js');
const JWT = require('./JWT.js');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


//eventually this should be removed due to security issues but while testing I'll leave it
mongoose.connect("mongodb+srv://michaelsault:70OByv77QoUUlQLb@cluster0.rrfulxt.mongodb.net/?retryWrites=true&w=majority").catch(err => console.log(err));

// Test connection
mongoose.connection.once('open', function () {
    console.log('MongoDB database connection established successfully')
});


// API
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


//DB SCHEMA AND MODEL
const guestSchema = mongoose.Schema({
    familyID: String,
    email: String,
    code: String,
    firstName: String,
    lastName: String,
    sangeet: Number,
    maiyan: Number,
    mendhi: Number,
    choora: Number,
    sikh: Number,
    civil: Number
});

//DB SCHEMA AND MODEL
const RSVPSchema = mongoose.Schema({
    familyID: String,
    email: String,
    firstName: String,
    lastName: String,
    sangeet: Number,
    maiyan: Number,
    mendhi: Number,
    choora: Number,
    sikh: Number,
    civil: Number,
    diet: String,
    comment: String
});

const Guests = mongoose.model("Guests", guestSchema);
const RSVPs = mongoose.model("RSVPs", RSVPSchema);


app.post("/InviteGuest", async (req, res) => {

    console.log(req.body.familyID);
    //generates a random 5-digit rsvp code
    var rsvpCode = rsvp.makeCode(5);

    //checks if the code is already assigned to a guest
    var codeExists = await Guests.find({code: rsvpCode}, {code:1}).exec();
    console.log(codeExists);
    console.log("break");

    //if the code exists, generate a new 5-digit code until a unique code is found
    while (codeExists.length > 0) {
        rsvpCode = rsvp.makeCode(5);
        codeExists = await Guests.find({code: rsvpCode}, {code:1}).exec();
        console.log(codeExists);
    }

    //create the guest in the db
    Guests.create({
        email: req.body.email,
        code: rsvpCode,
        familyID: req.body.familyID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sangeet: req.body.sangeet,
        maiyan: req.body.maiyan,
        mendhi: req.body.mendhi,
        choora: req.body.choora,
        sikh: req.body.sikh,
        civil: req.body.civil
    }).then(doc => console.log(doc))
    .catch(err => console.log(err));
});

//check if a guest exists using EMAIL
app.get("/getFamily", async(req, res) => {
    console.log("get family reached");
    console.log(req);
    try {
        console.log(req.query.firstName);
        console.log(req.query.lastName);
        const guest = await Guests.find({firstName: req.query.firstName, lastName: req.query.lastName})
        .catch((err) => console.log(err));
        
        console.log("Returned from Query");
        console.log(guest[0].familyID);

        const family = await Guests.find({familyID: guest[0].familyID})
        .catch((err) => console.log(err));

        console.log(family);

        res.send(family);

    } catch(error) {
        console.log(error);
    }
});

//create a new rsvp response entry
app.post("/submitRSVP", async (req, res) => {
    RSVPs.create({
        familyID: req.body.familyID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sangeet: req.body.sangeet,
        maiyan: req.body.maiyan,
        mendhi: req.body.mendhi,
        choora: req.body.choora,
        sikh: req.body.sikh,
        civil: req.body.civil,
        diet: req.body.diet,
        comment: req.body.comment
    }).then(doc => console.log(doc))
    .catch(err => console.log(err));
});

//fetches a complete list of guests
app.get("/guests", (req, res) => {
    Guests.find().then(items => res.json(items))
    .catch((err) => console.log(err));
});

//delete a guest from the db
app.delete("/delete/:id", (req, res) => {
    Guests.findByIdAndDelete({_id: req.params.id})
    .then(doc => console.log(doc))
    .catch((err) => console.log(err));
});

//update a guests information by id
app.put("/update/:id", (req, res) => {
    Guests.findByIdAndUpdate({_id: req.params.id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        sangeet: req.body.sangeet,
        maiyan: req.body.maiyan,
        mendhi: req.body.mendhi,
        choora: req.body.choora,
        sikh: req.body.sikh,
        civil: req.body.civil
    })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
    Guests.findByIdAndUpdate({_id: req.params.id}, {
        eventName: eventName
    })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});