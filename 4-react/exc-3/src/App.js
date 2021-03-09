import { useState } from 'react'

function App(props) {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(props.points)
  const handleNextAnecdote = () => {
    const anecdote = Math.round(Math.random() * (5 - 0) + 0)
    setSelected(anecdote)
  }
  const handleVote = () => {
    setPoints([
      ...points,
      points[selected] + 1
    ])
  }
  const numMax = Math.max(...props.points)
  const position = props.points.find((point, index) => point === numMax && index)
  console.log({numMax})
  console.log({position})
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>🧿 {props.anecdotes[selected]}</p>
      <p>❤ has {points[selected]} {points[selected] === 1 ? 'vote' : 'votes'}</p>
      <button onClick={handleVote}>Vote 👆</button>
      <button onClick={handleNextAnecdote}>next anecdote ➡</button>
      <h2>Anecdote with most votes</h2>
      <p></p>
    </div>
  );
}

export default App;
