export const Persons = ({ persons }) => {
  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default Persons;
