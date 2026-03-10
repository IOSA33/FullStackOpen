import { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1> { header }  </h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={ onClick }> { text } </button>
  )
}

const StatisticLine = ( { text, value, other } ) => {
  return (
    <tr> 
      <td> {text} </td>
      <td> {value} {other} </td>
    </tr>
  )
} 

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all != 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} other={"%"} />
        </tbody>
      </table>
    )
  }

  return (
    <div> No feedback given </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={"give feedback"}/>

      <Button onClick={() => setGood(good + 1)} text={"good"}/>
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} text={"bad"}/>

      <Header header={"statistics"}/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App