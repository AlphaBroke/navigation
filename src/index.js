import { render } from 'react-dom'
import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'
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
// let = local var but reset on render boese
// useState = local state triggers rerender, constant over component lifetime
// useRef = local var dont trigger rerender, constant over component lifetime
function Viewpager() {
  const index = useRef(0)
  const [props, set] = useSprings(navElements.length, (i) => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useGesture(({ down, delta: [xDelta], velocity }) => {
    const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
    const isEdge = (i) => i < index.current - 1 || i > index.current + 1
    const centerX = window.innerWidth / 2
    const lastIndex = navElements.length - 1

    if (down) {
      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', immediate: true }
        }
      })
    } else if (!down && (Math.abs(xDelta) > centerX || velocity > 1)) {
      index.current = clamp(index.current + (xDelta > 0 ? -1 : 1), 0, lastIndex)
      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', immediate: false }
        }
      })
    } else if (!down && (Math.abs(xDelta) <= centerX || velocity < 1)) {
      set((i) => {
        if (isEdge(i)) {
          return { display: 'none' }
        } else {
          return { x: newX(i), display: 'block', immediate: false }
        }
      })
    }
  })

  return props.map(({ x, display, sc }, i) => (
    <animated.div
      {...bind()}
      key={i}
      style={{
        display,
        transform: x.interpolate((x) => `translate3d(${x}px,0,0)`)
      }}>
      <NavElement color={navElements[i].color} ind={navElements[i].ind} sc={sc} />
    </animated.div>
  ))
}

render(<Viewpager />, document.getElementById('root'))
