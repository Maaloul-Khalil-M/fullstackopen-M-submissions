require("dotenv").config();
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

const app = express();

// allow cors
// const cors = require("cors");
// app.use(cors());

app.use(express.static("dist"));

// let persons = [{...}]

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(morgan(":method :url :status :response-time[3]ms body=:body"));

// find all persons (now with mongodb)
// Model.find()
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// count all persons
// Model.countDocuments()
app.get("/info", (request, response) => {
  Person.countDocuments({})
    .then((personsCount) => {
      const info = `
        <div>
          Phonebook has info for ${personsCount} people <br>
          ${new Date()}
        </div>
      `;
      response.send(info);
    })
    .catch((error) => {
      response.status(500).send({ error: "Failed to fetch info" });
    });
});

// get person by id
// Model.findById()
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).json({ error: "note not found" });
      }
      response.json(note);
    })
    .catch((error) => {
      console.error(error);
      response.status(400).json({ error: "malformatted id" });
    });
});

// save new person to db
// Model.save()
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

// delete person by id
// Model.findByIdAndDelete()
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.error(error);
      response.status(400).json({ error: "malformatted id" });
    });
});

// app.put
//front axios.put(`${baseUrl}/${id}`, newObject)
// findById return save
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
