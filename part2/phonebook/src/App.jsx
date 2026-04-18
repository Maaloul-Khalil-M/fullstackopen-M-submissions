import { useState, useEffect } from "react";
import fetchLogic from "./services/fetchLogic";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  //states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchLogic.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  //addPerson+axios, seperate validate logic
  function validatePerson(person, currentPersons) {
    if (verifyDupName(currentPersons, person)) {
      return `${person.name} is already added to phonebook`;
    }
    if (verifyDupNumber(currentPersons, person)) {
      return `${person.number} is already added to phonebook`;
    }
    return null;
  }

  const addPerson = (event) => {
    event.preventDefault();
    // generate id by server
    const personToAdd = { name: newName, number: newNumber };
    const errorMessage = validatePerson(personToAdd, persons);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    fetchLogic.create(personToAdd).then((returnedPerson) => {
      setPersons((prevPersons) => [...prevPersons, returnedPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

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
