const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/eventImages" });

mongoose
  .connect(
    "mongodb+srv://raphaelattfield:U4ZivtKn7i6x-iY@cluster0.3umc0ij.mongodb.net/"
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });


  const eventSchema = new mongoose.Schema({
    event_name: String,
    event_date: String,
    event_description: String,
    img: String,
    /*  _id: mongoose.SchemaTypes.ObjectId*/
  });

  const Event = mongoose.model("Event", eventSchema);

  app.get("/api/events", (req, res) => {
    getEvents(res);
  });
  
  const getEvents = async (res) => {
    const events = await Event.find();
    res.send(events);
  };



  app.post("/api/events", upload.single("img"), (req, res) => {
    const result = validateEvent(req.body);

    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    const event = new Event({
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      event_description: req.body.event_description,
    });
  
    if (req.file) {
      event.img = "eventImages/" + req.file.filename;
    }
  
    createEvent(event, res);
  });


  const createEvent = async (event, res) => {
    const result = await event.save();
    res.send(event);
  };


  app.put("/api/events/:id", upload.single("img"), (req, res) => {
    const result = validateEvent(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    updateEvent(req, res);
  });


  const validateEvent = (event) => {
    const schema = Joi.object({
      _id: Joi.allow(""),
      event_name: Joi.string().min(3).required(),
      event_date: Joi.string().min(5).required(),
      event_description: Joi.string().min(10).required(),
    });

    return schema.validate(event);
  };

  app.listen(3000, () => {
    console.log("I'm listening");
  });