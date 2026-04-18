import { nanoid } from "nanoid";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={filterHandler} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          number:
          <input type="tel" value={newNumber} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.length > 0 ? (
          filteredPersons.map((person) => (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </div>
  );
};

export default App;
