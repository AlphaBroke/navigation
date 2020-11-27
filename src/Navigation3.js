import React, { useEffect, useRef } from 'react'
import { animated, useTransition, useSprings } from 'react-spring'
import './App.css'
import * as R from 'ramda'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'

function Navigation({ navElements }) {
  const lastIndex = navElements.length - 1
  const topElement = R.last(navElements) || {}
  const stackAnimation = useTransition(navElements, (item) => item.key, {
    from: {
      position: 'fixed',
      transform: `translate3d(100%, 0, 0)`
    },
    enter: {
      position: 'fixed',
      transform: `translate3d(0%, 0, 0)`
    },
    leave: {
      position: 'fixed',
      transform: `translate3d(100%, 0, 0)`
    }
  })

  // const [spring, setSpring] = useSpring(() => ({ shift: 0 }))
  // useEffect(() => {
  //   setSpring({
  //     reset: true,
  //     from: { shift: 0 },
  //     to: { shift: -100 }
  //   })
  // }, [navElements])

  const index = useRef(0)

  const [props, set] = useSprings(topElement.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block'
  }))

  const bind = useGesture(({ down, delta: [xDelta], velocity }) => {
    animatePageTransition(down, xDelta, velocity)
  })

  function animatePageTransition(down, xDelta, velocity) {
    const newX = (i) => (i - index.current) * window.innerWidth + (down ? xDelta : 0)
    const centerX = window.innerWidth / 2
    const lastIndex = navElements.length - 1

    if (down) {
      set((i) => {
        return { x: newX(i), display: 'block', sc: 0.9, immediate: (n) => ['x', 'display'].includes(n) }
      })
    } else if (!down && (Math.abs(xDelta) > centerX || velocity > 1)) {
      index.current = clamp(index.current + (xDelta < 0 ? -1 : 1), 0, lastIndex)
      console.log(index.current)
      set((i) => {
        return { x: newX(i), display: 'block', sc: 1, immediate: false }
      })
    } else if (!down && (Math.abs(xDelta) <= centerX || velocity < 1)) {
      set((i) => {
        return { x: newX(i), display: 'block', sc: 1, immediate: false }
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
      {stackAnimation.map((t, i) => {
        const stack = t.item
        return (
          <animated.div
            key={stack.key}
            style={{
              ...(i >= lastIndex ? t.props : {}),
              position: 'absolute',
              width: '100vw',
              height: '100vh'
            }}>
            <animated.div
              style={{
                //   ...(i >= lastIndex ? { transform: spring.shift.interpolate((s) => `translate3d(${s}%, 0, 0)`) } : {}),
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                boxSizing: 'border-box'
              }}>
              <div className="nav-element-content">
                {/* ---USER CONTENT--- */}

                {t.item.element}

                {/* ---USER CONTENT--- */}
              </div>
            </animated.div>
          </animated.div>
        )
      })}

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
