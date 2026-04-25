export const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <div className="number-row" key={person.id}>
            <p>
              {person.name} {person.number}{" "}
            </p>
            <button className="btn-danger" onClick={() => deletePerson(person)}>
              delete
            </button>
          </div>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default Persons;
