const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const personsCount = persons.filter(
    (curr) => typeof curr === "object",
  ).length;
  const info = `<div>Phonebook has info for ${personsCount} people <br> ${new Date()}</div>`;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = "No person found";
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
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

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
