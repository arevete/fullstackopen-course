import { useState } from 'react'

const Header = ({title}) => {
  return <h1>{title}</h1>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({title, value, suffix}) => (
  <tr>
    <td>{title}</td>
    <td>{value} {suffix}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const statisticsTitle = "statistics"

  const all = (good + neutral + bad)
  const average = (good - bad) / all
  const positivePercentage = 100 * good / all

  if (all === 0) {
    return (
    <> 
      <Header title={statisticsTitle} />
      <p>No feedback given</p>
    </ >
    )
  }

  return (
    <> 
      <Header title={statisticsTitle} />
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title='all' value={all} />
          <StatisticLine title="average" value={average} />
          <StatisticLine title="positive" value={positivePercentage} suffix={"%"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackTitle = "give feedback"

  function handleClick(setCount, count) {
    setCount(count + 1)
  }

  return (
    <>
      <div>
        <Header title={feedbackTitle} />
        <Button handleClick={() => handleClick(setGood, good)} text="good"/>
        <Button handleClick={() => handleClick(setNeutral, neutral)} text="neutral"/>
        <Button handleClick={() => handleClick(setBad, bad)} text="bad"/>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App