export const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default Persons;
