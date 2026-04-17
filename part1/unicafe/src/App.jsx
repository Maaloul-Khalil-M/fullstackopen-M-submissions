import { useState } from "react";
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Stat = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const MoreStat = (props) => {
  const { good, neutral, bad } = props;

  const calcTotal = () => {
    return good + neutral + bad;
  };

  // good=1, neutral=0, bad=-1
  const calcAverage = () => {
    const total = calcTotal();
    if (total === 0) return 0;
    return (good * 1 + neutral * 0 + bad * -1) / total;
  };

  const calcPercPos = () => {
    const total = calcTotal();
    if (total === 0) return 0;
    return (good / total) * 100;
  };

  return (
    <div>
      <Stat text="all" value={calcTotal()} />
      <Stat text="average" value={calcAverage()} />
      <Stat text="positive" value={calcPercPos() + " %"} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
      <MoreStat good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
