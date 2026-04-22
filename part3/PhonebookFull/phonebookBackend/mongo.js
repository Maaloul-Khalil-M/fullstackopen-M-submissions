// https://alexbevi.com/blog/2023/11/13/querysrv-errors-when-connecting-to-mongodb-atlas/
const { setServers } = require("node:dns").promises;
setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const password = process.argv[2];
if (!password) {
  console.log("password required");
  process.exit(1);
}

// phonebookApp is the database (collection)
// retryWrites, majority, appName: helpful params
const uri = `mongodb+srv://maaloulmohamedkhalil_db_user:${password}@learning.glnk1c7.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=learning`;
// connecting
mongoose
  .connect(uri, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
    mongoose.connection.close();
  });

// create schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

const personSave = (name, number) => {
  const person = new Person({ name, number });
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const personFindAll = () => {
  Person.find({}).then((persons) => {
    if (persons.length !== 0) {
      console.log("phonebook:");
      persons.forEach((p) => console.log(`${p.name} ${p.number}`));
    } else {
      console.log("phonebook is empty");
    }
    mongoose.connection.close();
  });
};

if (name && number) {
  personSave(name, number);
} else if (!name && !number) {
  personFindAll();
} else {
  console.log("each person needs a number");
  mongoose.connection.close();
}
