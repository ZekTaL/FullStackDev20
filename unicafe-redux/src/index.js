import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetStats = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <button onClick={good}>GOOD</button> 
      <button onClick={neutral}>NEUTRAL</button> 
      <button onClick={bad}>BAD</button>
      <button onClick={resetStats}>RESET STATS</button>
      <br></br>
      <div>Good: {store.getState().good}</div>
      <div>Neutral: {store.getState().neutral}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(() => {
  renderApp()
  console.log(store.getState())
})
