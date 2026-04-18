import { nanoid } from "nanoid";
import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  //states
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  //logic
  const nameHandler = (event) => {
    setNewName(event.target.value);
  };
  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };
  const filterHandler = (event) => {
    setFilter(event.target.value);
  };
  const verifyDupName = (arr, newItem) => {
    return arr.some(
      (item) => item.name.toUpperCase() === newItem.name.toUpperCase(),
    );
  };
  const verifyDupNumber = (arr, newItem) => {
    return arr.some((item) => item.number === newItem.number);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = { name: newName, number: newNumber, id: nanoid() };
    if (verifyDupName(persons, personToAdd)) {
      alert(`${newName} is already added to phonebook`);
    } else if (verifyDupNumber(persons, personToAdd)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      setPersons((prevPersons) => [...prevPersons, personToAdd]);
      setNewName("");
      setNewNumber("");
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  // passing state and logic to child
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={filterHandler} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
