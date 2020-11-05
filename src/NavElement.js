import React from 'react'
import { animated } from 'react-spring'
import './App.css'

const NavElement = ({ ind, color, scale }) => {
  return (
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
          backgroundColor: color,
          transform: scale.interpolate((s) => `scale(${s})`)
        }}>
        {ind}
      </animated.div>
    </div>
  )
}

export default NavElement
