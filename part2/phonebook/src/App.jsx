import fetchLogic from "./services/fetchLogic";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  //states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [feedback, setFeedback] = useState({ msg: null, isError: false });

  //starting logic
  useEffect(() => {
    fetchLogic.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  //check for newItem with existing name
  const getDupPerson = (arr, newItem) => {
    const duplicate = arr.find(
      (item) => item.name.toUpperCase() === newItem.name.toUpperCase(),
    );
    return duplicate;
  };

  //if found duplicate, confirm then modify (PUT)
  const handleDuplicateConfirmation = (duplicatedPerson, personToAdd) => {
    const isConfirmed = confirm(
      `${duplicatedPerson.name} is already added to phonebook\nReplace the old number with the new one?`,
    );
    if (!isConfirmed) return;
    fetchLogic
      .modify(duplicatedPerson.id, personToAdd)
      .then((returnedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.map((p) =>
            p.id === duplicatedPerson.id ? returnedPerson : p,
          ),
        );
        setFeedback((prevFeed) => ({
          msg: `${newName} was successfully modified`,
          isError: false,
        }));
      });
    setNewName("");
    setNewNumber("");
  };

  //if found duplicate handleDuplicate
  //else add with create
  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = { name: newName, number: newNumber };
    const duplicatedPerson = getDupPerson(persons, personToAdd);
    if (duplicatedPerson !== undefined) {
      handleDuplicateConfirmation(duplicatedPerson, personToAdd);
      return;
    }
    fetchLogic.create(personToAdd).then((returnedPerson) => {
      setPersons((prevPersons) => [...prevPersons, returnedPerson]);
      setFeedback((prevFeed) => ({
        msg: `${newName} was successfully added`,
        isError: false,
      }));
      setNewName("");
      setNewNumber("");
    });
  };

  //delete logic
  const deletePerson = (person) => {
    if (!confirm(`Delete ${person.name} ?`)) {
      return;
    }
    fetchLogic.delete(person.id).then(() => {
      //filter out the deleted person from the current list
      setPersons((prevPersons) =>
        prevPersons.filter((p) => p.id !== person.id),
      );
      setFeedback((prevFeed) => ({
        msg: `${person.name} was successfully deleted`,
        isError: false,
      }));
      setFilter("");
    });
  };

  //handlers
  const nameHandler = (event) => {
    setNewName(event.target.value);
  };
  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };
  const filterHandler = (event) => {
    setFilter(event.target.value);
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  // passing state and logic to child
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification feedback={feedback} />
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};
export default App;
