const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

var path = require("path");

const PORT = process.env.PORT || 3050;

//require("./routes/htmlRoutes")
//require("./routes/apiRoutes")

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


//HTML routes go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});


//API routes go here
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
//Grabs info from the database and fills in the stats page 
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//creates new exercise
app.post("/api/workouts", function (req, res) {
  db.Workout.create({}).then(data =>
    res.json(data)).catch(err => {
      console.log(err)
      res.json(err)
    })
});

app.put("/api/workouts/:id", ({body, params}, res) => {
  db.Workout.findByIdAndUpdate(
      params.id,{
          $push: {exercises: body} },
          {new: true}
  ).then (data => res.json(data))
  .catch(err => {
      console.log(err)
      res.json(err)
  })
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});