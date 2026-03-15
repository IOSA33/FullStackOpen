import Header from "./Header"
import Content from "./Content/Content"
import Total from "./Content/Total"

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

export default Course