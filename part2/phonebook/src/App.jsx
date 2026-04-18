import { nanoid } from "nanoid";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameToAdd = { name: newName };

    if (verifyDupName(persons, nameToAdd)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prevPersons) => [...prevPersons, nameToAdd]);
      setNewName("");
    }
  };

  const verifyDupName = (arr, newItem) => {
    return arr.some(
      (item) => item.name.toUpperCase() === newItem.name.toUpperCase(),
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={nanoid()}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
