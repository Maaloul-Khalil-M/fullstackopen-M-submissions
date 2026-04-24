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

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(morgan(":method :url :status :response-time[3]ms body=:body"));

// find all persons (now with mongodb)
app.get("/api/persons", (request, response) => {
  // response.json(persons);
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// count all persons
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const personsCount = persons.filter(
      (curr) => typeof curr === "object",
    ).length;
    const info = `<div>Phonebook has info for ${personsCount} people <br> ${new Date()}</div>`;
    response.send(info);
  });
});

// get person by id
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).send("No person found");
    }
  });
});

const generateId = () => {
  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };
  const minId = Math.min(...persons.map((p) => p.id));
  return getRandomInt(minId + 1, minId + 100);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const existingPerson = persons.find((p) => p.name === body.name);

  if (existingPerson) {
    // 409 Conflict
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: String(generateId()),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  //201 Created
  response.status(201).json(person);
});

// delete person by id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
