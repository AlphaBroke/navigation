import { render } from 'react-dom'
import React, { useState, useRef } from 'react'
import Navigation from './Navigation'
import * as R from 'ramda'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './App.css'

const navElements = [
  <div style={{ backgroundColor: 'red', height: '100%' }}>1</div>,
  <div style={{ backgroundColor: 'blue', height: '100%' }}>2</div>,
  <div style={{ backgroundColor: 'green', height: '100%' }}>3</div>,
  <div style={{ backgroundColor: 'turquoise', height: '100%' }}>4</div>,
  <div style={{ backgroundColor: 'powderblue', height: '100%' }}>5</div>
]

function App() {
  const [stack, setStack] = useState([navElements[0]])
  const [ind, setInd] = useState(1)

  const index = useRef(0)
  const [props, set] = useSprings(navElements.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block'
    // config: { friction: 100 }
  }))

  function animatePageTransition(down, xDelta, velocity) {
    const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
    const isEdge = (i) => i < 0 || i >= navElements.length
    const centerX = window.innerWidth / 2
    const lastIndex = navElements.length - 1

    if (down) {
      // runs a million times on down:
      // stack.length < navElements.length && setStack(R.append(navElements[stack.length], stack))

      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', sc: 0.9, immediate: (n) => ['x', 'display'].includes(n) }
        }
      })
    } else if (!down && (Math.abs(xDelta) > centerX || velocity > 1)) {
      index.current = clamp(index.current + (xDelta > 0 ? -1 : 1), 0, lastIndex)
      // console.log(index.current)
      set((i) => {
        // console.log((i - index.current) * window.innerWidth)

        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', sc: 1, immediate: false }
        }
      })
    } else if (!down && (Math.abs(xDelta) <= centerX || velocity < 1)) {
      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', sc: 1, immediate: false }
        }
      })
    }
  }

  function pushElement() {
    ind < navElements.length && setInd(ind + 1)
    stack.length < navElements.length && setStack(R.append(navElements[stack.length], stack))
    animatePageTransition(false, -1, 1.01)
  }

  function dropElement() {
    ind > 1 && setInd(ind - 1) // rework if gesture triggers R.append on down & velocity -1
    // (old: (ind < stack.length) & (stack.length > 2))
    ;(ind < stack.length) & (stack.length > 2) && setStack(R.dropLast(1, stack))
    animatePageTransition(false, 1, 1.01)
  }

  console.log('ind', ind)
  console.log('stack.length', stack.length)

  return (
    <>
      <Navigation navElements={stack} animatePageTransition={animatePageTransition} props={props} />
      <button onClick={dropElement} className="button1">
        III
      </button>
      <button onClick={pushElement} className="button2">
        III
      </button>
    </>
  )
}

render(<App />, document.getElementById('root'))
