export const Filter = ({ value, onChange }) => {
  return (
    <div className="input-wrapper">
      <p>filter shown with</p> <input value={value} onChange={onChange} />
    </div>
  );
};
export default Filter;
