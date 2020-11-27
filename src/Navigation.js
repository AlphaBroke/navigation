import React, { useRef, useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './App.css'
import * as R from 'ramda'

function Navigation({ navElements, setStack }) {
  const index = useRef(0)
  const [props, set] = useSprings(navElements.length, (i) => ({
    x: (i - index.current) * window.innerWidth,
    sc: 1,
    display: 'block'
    // onRest: () => {}
    // config: { friction: 1000 }
  }))

  console.log(props)

  useEffect(() => {
    animatePageTransition(false, -1, 1.01)
    console.log('effect fired')
  }, [navElements])

  const bind = useGesture(({ down, delta: [xDelta], velocity }) => {
    animatePageTransition(down, xDelta, velocity)
  })

  function animatePageTransition(down, xDelta, velocity) {
    const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
    const centerX = window.innerWidth / 2
    const lastIndex = navElements.length - 1

    if (down) {
      set((i) => {
        return {
          x: newX(i),
          display: 'block',
          sc: 0.9,
          immediate: (n) => ['x', 'display'].includes(n),
          onRest: () => {}
        }
      })
    } else if (!down && xDelta < 0 && (Math.abs(xDelta) > centerX || velocity > 1)) {
      index.current = clamp(index.current + 1, 0, lastIndex)
      set((i) => {
        return {
          x: newX(i),
          display: 'block',
          sc: 1,
          immediate: false
          // onRest: () => {}
        }
      })
    } else if (!down && xDelta > 0 && (Math.abs(xDelta) > centerX || velocity > 1)) {
      // setStack(R.dropLast(1))
      index.current = clamp(index.current - 1, 0, lastIndex)
      set((i) => {
        console.log('SET SPRING')
        return {
          x: newX(i),
          display: 'block',
          sc: 1,
          immediate: false,
          onRest: () => {
            if (!down && index.current === i) {
              console.log('REST')
              setStack(R.dropLast(navElements.length - (index.current + 1)))
            }
          }
        }
      })
    } else if (!down && (Math.abs(xDelta) <= centerX || velocity < 1)) {
      set((i) => {
        return {
          x: newX(i),
          display: 'block',
          sc: 1,
          immediate: false,
          onRest: () => {
            if (!down && index.current === i) {
              console.log('REST')
              setStack(R.dropLast(navElements.length - (index.current + 1)))
            }
          }
        }
      })
    }
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
          <div
            className="nav-element"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              boxSizing: 'border-box'
            }}>
            <animated.div
              className="nav-element-content"
              style={{
                flex: 1,
                transform: sc.interpolate((sc) => `scale(${sc})`)
              }}>
              {/* ---USER CONTENT--- */}

              {navElements[i].element}

              {/* ---USER CONTENT--- */}
            </animated.div>
          </div>
        </animated.div>
      ))}
    </div>
  )
}

export default Navigation
