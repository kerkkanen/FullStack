import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  if (props.all.length == 0) {
  return (
  <div>
    No feedback given
  </div>
  )
  }

  const sum = props.all.reduce((sum, value) => {
    return sum + value
  })

  return (
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all.length}/>
      <StatisticLine text="average" value={sum/props.all.length}/>
      <StatisticLine text="positive" value={(props.good/props.all.length)*100}/>
    </div>
  )
}
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])


  const handleGoodClick = () => {
    setAll(all.concat(1))
    setGood(good + 1)
  }
  
  const handleBadClick = () => {
    setAll(all.concat(-1))
    setBad(bad + 1)
  }
  
  const handleNeutralClick = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
   
      
       
    </div>
  )
}

export default App