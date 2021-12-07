import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import './App.css'
import Page from './Page'
import Navigation from './Navigation'

function App() {
  const [stack, setStack] = useState([])
  const [dropTrigger, setDropTrigger] = useState(0)

  console.log(stack)

  function pushPage(key, keyPath) {
    setStack(
      R.append({
        // key,
        element: () => <Page blockss={key} blockPath={keyPath} pushPage={pushPage} />
      })
    )
  }

  function dropElement() {
    setDropTrigger(dropTrigger + 1)
  }

  useEffect(() => {
    pushPage()
  }, [])

  return (
    <>
      <Navigation stack={stack} setStack={setStack} dropTrigger={dropTrigger} />
      <button onClick={dropElement} className="button6">
        Back
      </button>
    </>
  )
}

export default App
