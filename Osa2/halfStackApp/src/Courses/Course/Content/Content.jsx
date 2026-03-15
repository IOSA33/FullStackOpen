import Part from "./Part"

const Content = ({ parts }) => {
  return ( 
    <div>
      { parts.map(prop => {
          return <Part key={prop.id} part={prop} />
        }) }
    </div>
  )
}

export default Content