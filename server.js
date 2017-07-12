var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var Exercise = require("./models/exercise.js")
const port = process.env.port || 8000;
const app = express();

const dbUrl = "mongodb://localhost:27017/stattrackerDB";


mongoose.connect(dbUrl).then(function (err, db) {
    if (err) {
        console.log('error', err)
    };
    console.log("Connected to Mongoose")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session(sessionConfig));
// function checkAuth(req, res, next) {
//     if (!req.session.user) {
//         return res.redirect('/login');
//     } else {
//         next();
//     }
// }

app.get('/api/activities', (req, res) => {
    Exercise.find().then(foundExercises => {
        res.send(foundExercises);
    })
        .catch(err => {
            res.status(500).send(err);
        })
})

app.get('/api/activities/:id', (req, res) => {
    Exercise.findOne({ _id: req.params.id }).then(foundExercise => {
        res.send(foundExercise);
    })
        .catch(err => {
            res.status(500).send(err);
        })
})

app.post('/api/activities', (req, res) => {
    let exerciseData = req.body;
    let newExercise = new Exercise(exerciseData);
    newExercise.save().then(savedExercise => {
        res.send(savedExercise);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});


app.put('/api/activities/:id', (req, res) => {
    Exercise.updateOne({ _id: req.params.id }, req.body)
        .then(updateExercise => {
            res.send(updateExercise);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

app.delete('/api/activities/:id', (req, res) => {
    Exercise.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send("Deleted Record");
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

app.post('./api/activities/:id/stats', (req, res) => {
    let exerciseData = req.body;
    let newExercise = new Exercise(exerciseData);
    newExercise.save().then(savedExercise => {
        res.send(savedExercise);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});

app.delete('/api/stats/:id', (req, res) => {
    Exercise.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send("Deleted Record");
        })
        .catch(err => {
            res.status(500).send(err)
        })
})










app.listen(port, function (req, res) {
});
