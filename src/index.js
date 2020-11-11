import { render } from 'react-dom'
import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import NavElement from './NavElement'

const navElements = [
  {
    ind: 1,
    key: 1,
    color: 'aliceblue'
  },
  {
    ind: 2,
    key: 2,
    color: 'red'
  },
  {
    ind: 3,
    key: 3,
    color: 'blue'
  },
  {
    ind: 4,
    key: 4,
    color: 'antiquewhite'
  },
  {
    ind: 5,
    key: 5,
    color: 'yellow'
  }
]
// let = local var but reset on render (bad)
// useState = local state triggers rerender, constant over component lifetime
// useRef = local var dont trigger rerender, constant over component lifetime

function Viewpager() {
  const index = useRef(0)
  const [props, set] = useSprings(navElements.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block'
    // config: { friction: 100 }
  }))

  const bind = useGesture(({ down, delta: [xDelta], velocity }) => {
    animatePageTransition(down, xDelta, velocity)
  })

  function animatePageTransition(down, xDelta, velocity) {
    const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
    const isEdge = (i) => i < 0 || i >= navElements.length
    const centerX = window.innerWidth / 2
    const lastIndex = navElements.length - 1

    if (down) {
      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', sc: 0.9, immediate: (n) => ['x', 'display'].includes(n) }
        }
      })
    } else if (!down && (Math.abs(xDelta) > centerX || velocity > 1)) {
      index.current = clamp(index.current + (xDelta > 0 ? -1 : 1), 0, lastIndex)
      console.log(index.current)
      set((i) => {
        console.log((i - index.current) * window.innerWidth)

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

  function Back() {
    animatePageTransition(false, 1, 1.01)
  }

  function Forward() {
    animatePageTransition(false, -1, 1.01)
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        userSelect: 'none',
        position: 'fixed',
        overflow: 'hidden'
      }}>
      {props.map(({ x, display, sc }, i) => (
        <animated.div
          {...bind()}
          key={i}
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            display,
            transform: x.interpolate((x1) => `translate3d(${x1}px,0,0)`)
          }}>
          <NavElement color={navElements[i].color} ind={navElements[i].ind} scale={sc} />
        </animated.div>
      ))}
      <button onClick={Back} className="button1">
        III
      </button>
      <button onClick={Forward} className="button2">
        III
      </button>
    </div>
  )
}

render(<Viewpager />, document.getElementById('root'))
