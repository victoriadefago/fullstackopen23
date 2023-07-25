import { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {

  const calculateAll = () => good + bad + neutral

  const calculateAverage = () => {
    let total = calculateAll()
    return ((good-bad)/total).toFixed(2)
  }

  const calculatePositive = () => {
    let total = calculateAll()
    return (good/total*100).toFixed(2) + '%'
  }

  if(good===0 && bad===0 && neutral===0) {
    return (
      <>
        <h2>Statitics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral'value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={calculateAll()}/>
        <StatisticLine text='average' value={calculateAverage()} />
        <StatisticLine text='postive' value={calculatePositive()}/>
        </tbody>
      </table>   
    </>
  )
}


const Button = ({handleFeedback, text}) => {
  return (
    <button onClick={handleFeedback}>{text}</button>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (feedback) => () => {
    if(feedback === 'good') {
      setGood(good + 1)
    } else if(feedback === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button handleFeedback={handleFeedback('good')} text="good"/>
      <Button handleFeedback={handleFeedback('neutral')} text="neutral"/>
      <Button handleFeedback={handleFeedback('bad')} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)