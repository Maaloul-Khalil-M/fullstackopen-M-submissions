import { useState } from "react";

//already implemented
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

//rename Stat to StatisticLine each is tr
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const MoreStat = ({ good, neutral, bad }) => {
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
  // we need a fragment
  return (
    <>
      <StatisticLine text="all" value={calcTotal()} />
      <StatisticLine text="average" value={calcAverage()} />
      <StatisticLine text="positive" value={calcPercPos() + " %"} />
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  let feedback = <p>No feedback given</p>;

  if (!(good === 0 && neutral === 0 && bad === 0)) {
    feedback = (
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <MoreStat {...props} />
      </tbody>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      {feedback}
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
