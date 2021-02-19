import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import { Statistics } from './Statistics'
import { WarningNotStatistics } from './WarnignNotStatistics'
import { ButtonVote } from './ButtonVote'

const App = () => {
  // save clicks of each button to its own state
  //const [good, setGood] = useState(0)
  //const [neutral, setNeutral] = useState(0)
  //const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0
  })
  const handleClickGood = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
      all: feedback.all + 1,
      average: feedback.average + 1
    })
  }
  const handleClickNeutral = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
      all: feedback.all + 1
    })
  }
  const handleClickBad = () => {
    setFeedback({
      ...feedback,
      bad: feedback.bad + 1,
      all: feedback.all + 1,
      average: feedback.average - 1
    })
  }
  const average = feedback.average / feedback.all || 0
  const positive = (feedback.good * 100) / feedback.all || 0
  return (
    <div>
      <h2>🥳 give feedback</h2>
      <ButtonVote
        handleClick={handleClickGood}
        icon='😄'
        text='good' 
      />
      <ButtonVote
        handleClick={handleClickNeutral}
        icon='😐'
        text='neutral'
      />
      <ButtonVote
        handleClick={handleClickBad}
        icon='😡'
        text='bad'
      />
      <h2>🏆 statistics</h2>
      {
        feedback.good === 0 && feedback.neutral === 0 && feedback.bad === 0 
        ? <WarningNotStatistics />
        : <Statistics
            feedback={feedback}
            average={average}
            positive={positive} 
          />
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))