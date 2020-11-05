import React from 'react'
import { animated } from 'react-spring'
import './App.css'

const NavElement = ({ ind, color, scale }) => {
  return (
    <div className="nav-element">
      <animated.div
        className="nav-element-content"
        style={{
          backgroundColor: color,
          transform: scale.interpolate((s) => `scale(${s})`)
        }}>
        {ind}
      </animated.div>
    </div>
  )
}

export default NavElement
