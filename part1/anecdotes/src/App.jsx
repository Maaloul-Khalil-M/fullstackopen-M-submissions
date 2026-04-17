import { useState } from "react";

//refactor because similar structure
const AnecdoteDisplay = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const Most = ({ votes, anecdotes }) => {
  const max = Math.max(...votes);
  const maxIndex = votes.indexOf(max);
  return (
    <AnecdoteDisplay
      title="anecdotes with most votes"
      anecdote={anecdotes[maxIndex]}
      votes={max}
    />
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomIndex = (len = anecdotes.length) => {
    return Math.floor(Math.random() * len);
  };

  //spread op doing it's job
  const handleIncrementVote = (index) => {
    setVotes([
      ...votes.slice(0, index),
      votes[index] + 1,
      ...votes.slice(index + 1),
    ]);
  };

  return (
    <div>
      <AnecdoteDisplay
        title="anecdotes of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={() => handleIncrementVote(selected)}>vote</button>
      <button onClick={() => setSelected(getRandomIndex())}>
        next anecdote
      </button>
      <Most votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
