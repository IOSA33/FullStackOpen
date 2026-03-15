import Course from "./Course/Course"

const Courses = ({ allCourses }) => {
  return (
    <div>
      { allCourses.map(prop => {
        return <Course key={prop.id} oneCourse={prop} />
      }) }
    </div>
  )
}

export default Courses