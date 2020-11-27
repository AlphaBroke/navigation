import { render } from 'react-dom'
import React, { useState } from 'react'
import Navigation from './Navigation'
import * as R from 'ramda'
import './App.css'

const List1 = () => (
  <>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
    <div style={{ borderBottom: '1px solid #ddd', fontSize: 16, width: '100%', height: 70 }}>Hallo</div>
  </>
)

const navElements = [
  {
    key: 1,
    element: (
      <div style={{ height: '100%' }}>
        1
        <List1 />
      </div>
    ) //backgroundColor: 'red',
  },
  {
    key: 2,
    element: (
      <div style={{ height: '100%' }}>
        2
        <List1 />
      </div>
    ) //backgroundColor: 'blue',
  },
  {
    key: 3,
    element: (
      <div style={{ height: '100%' }}>
        3
        <List1 />
      </div>
    ) //backgroundColor: 'green',
  },
  {
    key: 4,
    element: (
      <div style={{ height: '100%' }}>
        4
        <List1 />
      </div>
    ) //backgroundColor: 'turquoise',
  },
  {
    key: 5,
    element: (
      <div style={{ height: '100%' }}>
        5
        <List1 />
      </div>
    ) //backgroundColor: 'powderblue',
  }
]

function App() {
  const [stack, setStack] = useState([{}])

  function pushElement({ target: { value } }) {
    setStack(R.append(navElements[value]))
  }

  function dropElement() {
    stack.length > 1 && setStack(R.dropLast(1))
  }

  return (
    <>
      <Navigation navElements={stack} setStack={setStack} />

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
