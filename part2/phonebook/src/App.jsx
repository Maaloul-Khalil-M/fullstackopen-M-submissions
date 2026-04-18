import { nanoid } from "nanoid";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberHandler = (event) => {
    setNewNumber(event.target.value);
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

  const verifyDupName = (arr, newItem) => {
    return arr.some(
      (item) => item.name.toUpperCase() === newItem.name.toUpperCase(),
    );
  };

  const verifyDupNumber = (arr, newItem) => {
    return arr.some((item) => item.number === newItem.number);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
