const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  const _parts = [];
  const exercises = [];
  for (const part of parts) {
    _parts.push(part.name);
    exercises.push(part.exercises);
  }

  return (
    <div>
      <Part part={_parts[0]} exercise={exercises[0]} />
      <Part part={_parts[1]} exercise={exercises[1]} />
      <Part part={_parts[2]} exercise={exercises[2]} />
    </div>
  );
};

const Total = ({ parts }) => {
  const exercises = [];
  for (const part of parts) {
    exercises.push(part.exercises);
  }
  // mdn: reduce to calculate sum
  const sum = exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
