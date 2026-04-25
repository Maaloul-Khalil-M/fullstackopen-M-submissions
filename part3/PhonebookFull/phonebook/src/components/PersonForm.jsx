export const PersonsForm = ({
  addPerson,
  newName,
  nameHandler,
  newNumber,
  numberHandler,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div className="form-row">
        <p>name</p> <input value={newName} onChange={nameHandler} />
      </div>
      <div className="form-row">
        <p>number</p>
        <input type="tel" value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" className="btn-add">
          add
        </button>
      </div>
    </form>
  );
};
export default PersonsForm;
