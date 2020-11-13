import React, { useRef, useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated, useTransition } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './App.css'

// let = local var but reset on render (bad)
// useState = local state triggers rerender, constant over component lifetime
// useRef = local var dont trigger rerender, constant over component lifetime

function Navigation({ navElements, animatePageTransition, props }) {
  // const index = useRef(0)
  // const [props, set] = useSprings(navElements.length, (i) => ({
  //   x: i * window.innerWidth,
  //   sc: 1,
  //   display: 'block'
  //   // config: { friction: 100 }
  // }))

  // const stackAnimation = useTransition(navElements, (item) => item.key, {
  //   from: {
  //     position: 'fixed',
  //     transform: `translate3d(-100%, 0, 0)`
  //   },
  //   enter: {
  //     position: 'fixed',
  //     transform: `translate3d(0%, 0, 0)`
  //   },
  //   leave: {
  //     position: 'fixed',
  //     transform: `translate3d(100%, 0, 0)`
  //   }
  // })

  // useEffect(() => {
  //   animatePageTransition(false, -1, 1.01)
  // }, [navElements])

  const bind = useGesture(({ down, delta: [xDelta], velocity }) => {
    animatePageTransition(down, xDelta, velocity)
  })

  // function animatePageTransition(down, xDelta, velocity) {
  //   const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
  //   // const isEdge = (i) => i < 0 || i >= navElements.length
  //   const centerX = window.innerWidth / 2
  //   const lastIndex = navElements.length - 1

  //   if (down) {
  //     set((i) => {
  //       // if (isEdge(i)) {
  //       //   return { display: 'none' }
  //       // } else {
  //       return { x: newX(i), display: 'block', sc: 0.9, immediate: (n) => ['x', 'display'].includes(n) }
  //       // }
  //     })
  //   } else if (!down && (Math.abs(xDelta) > centerX || velocity > 1)) {
  //     index.current = clamp(index.current + (xDelta > 0 ? -1 : 1), 0, lastIndex)

  //     set((i) => {
  //       console.log(i - index.current)

  //       // if (isEdge(i)) {
  //       //   return { display: 'none' }
  //       // } else {
  //       return { x: newX(i), display: 'block', sc: 1, immediate: false }
  //       // }
  //     })
  //   } else if (!down && (Math.abs(xDelta) <= centerX || velocity < 1)) {
  //     set((i) => {
  //       // if (isEdge(i)) {
  //       //   return { display: 'none' }
  //       // } else {
  //       return { x: newX(i), display: 'block', sc: 1, immediate: false }
  //       // }
  //     })
  //   }
  // }

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

              {navElements[i]}

              {/* ---USER CONTENT--- */}
            </animated.div>
          </div>
        </animated.div>
      ))}
    </div>
  )
}

export default Navigation
