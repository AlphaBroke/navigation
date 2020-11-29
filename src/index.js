import { render } from 'react-dom'
import React, { useState } from 'react'
import Navigation from './Navigation'
import * as R from 'ramda'
import './App.css'
import Page from './Page'

const navElements = [
  {
    key: 1,
    element: Page
  },
  {
    key: 2,
    element: Page
  },
  {
    key: 3,
    element: Page
  },
  {
    key: 4,
    element: Page
  },
  {
    key: 5,
    element: Page
  }
]

function App() {
  const [stack, setStack] = useState([navElements[0]])
  const [dropTrigger, setDropTrigger] = useState(0)

  function pushElement({ target: { value } }) {
    setStack(R.append(navElements[value]))
  }

  function dropElement() {
    setDropTrigger(dropTrigger + 1)
  }

  return (
    <>
      <Navigation stack={stack} setStack={setStack} dropTrigger={dropTrigger} />

      <button onClick={(e) => pushElement(e)} className="button1" value={0}>
        1
      </button>
      <button onClick={(e) => pushElement(e)} className="button2" value={1}>
        2
      </button>
      <button onClick={(e) => pushElement(e)} className="button3" value={2}>
        3
      </button>
      <button onClick={(e) => pushElement(e)} className="button4" value={3}>
        4
      </button>
      <button onClick={(e) => pushElement(e)} className="button5" value={4}>
        5
      </button>
      <button onClick={dropElement} className="button6">
        Back
      </button>
    </>
  )
}

render(<App />, document.getElementById('root'))
