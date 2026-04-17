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

const Content = ({ parts, exercises }) => {
  return (
    <div>
      <Part part={parts[0]} exercise={exercises[0]} />
      <Part part={parts[1]} exercise={exercises[1]} />
      <Part part={parts[2]} exercise={exercises[2]} />
    </div>
  );
};

const Total = ({ exercises }) => {
  // mdn: reduce to calculate sum
  const sum = exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1.name, part2.name, part3.name]}
        exercises={[part1.exercises, part2.exercises, part3.exercises]}
      />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

export default App;
