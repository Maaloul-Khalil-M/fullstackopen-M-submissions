const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({part,exercise}) => {
  return <p>{part} - {exercise}</p>;
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
  const { e1, e2, e3 } = exercises;
  const sum = e1 + e2 + e3;

  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        // pass as array not object
        // parts={{ p1: part1, p2: part2, p3: part3 }}
        // exercises={{ e1: exercises1, e2: exercises2, e3: exercises3 }}
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={{ e1: exercises1, e2: exercises2, e3: exercises3 }} />
    </div>
    // <div>
    //   <h1>{course}</h1>
    //   <p>
    //     {part1} {exercises1}
    //   </p>
    //   <p>
    //     {part2} {exercises2}
    //   </p>
    //   <p>
    //     {part3} {exercises3}
    //   </p>
    //   <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    // </div>
  );
};

export default App;
