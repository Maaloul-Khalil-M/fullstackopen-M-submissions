const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts, exercises }) => {
  const { p1, p2, p3 } = parts;
  const { e1, e2, e3 } = exercises;
  return (
    <div>
      <p>
        {p1} - {e1}
      </p>
      <p>
        {p2} - {e2}
      </p>
      <p>
        {p3} - {e3}
      </p>
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
        parts={{ p1: part1, p2: part2, p3: part3 }}
        exercises={{ e1: exercises1, e2: exercises2, e3: exercises3 }}
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
