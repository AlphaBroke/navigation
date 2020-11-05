import React from 'react'
import './App.css'

const NavElement = ({ ind, color, sc }) => {
  return (
    <div className="nav-element">
      <div className="nav-element-content" style={{ backgroundColor: color }}>
        {ind}
      </div>
    </div>
  )
}

export default NavElement
