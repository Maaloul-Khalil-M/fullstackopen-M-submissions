export const PersonsForm = ({
  addPerson,
  newName,
  nameHandler,
  newNumber,
  numberHandler,
}) => {
  return (
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
  );
};
export default PersonsForm;
