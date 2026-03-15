const Header = ( {text} ) => <h1>{text}</h1>

const Content = ({ parts }) => {
  return ( 
    <div>
      { parts.map(prop => {
          return <Part key={prop.id} part={prop} />
        }) }
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ total }) => {
  return ( 
    <b>total of exercises {total}</b>
  )
}

const Course = ({ oneCourse }) => {
  const totalAmount = oneCourse.parts.reduce((sum, part) => {
    return sum + part.exercises
  },0)

  return (
    <div>
      <Header text={oneCourse.name} />
      <Content parts={oneCourse.parts} />
      <Total total={totalAmount} />
    </div>
  )
}

const Courses = ({ allCourses }) => {
  return (
    <div>
      { allCourses.map(prop => {
        return <Course key={prop.id} oneCourse={prop} />
      }) }
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text={"Web development curriculum"} />
      <Courses allCourses={courses} />
    </div>
  )
}

export default App