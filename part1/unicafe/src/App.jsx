import { useState } from "react";
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Stat = ({text,value}) => {
  return <p>{text} {value}</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <h2>statistics</h2>
      <Stat text="good" value={good}/>
      <Stat text="neutral" value={neutral}/>
      <Stat text="bad" value={bad}/>
    </div>
  );
};

export default App;
