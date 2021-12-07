import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

function Page(props, { pushPage }) {
  const [num, setNum] = useState(0)
  const [list, setList] = useState([])

  function tets() {
    setNum(num + 1)
    setList(R.append(`${props.blocks.plans.lens.to} ${num}`))
  }

  return (
    <div className="rec">
      {Object.keys(props.blocks).map((propKey, i) => {
        const block = props.blocks[propKey]
        return (
          <div key={i}>
            <b onClick={tets}>{block.lens.propname}</b>
          </div>
        )
      })}

      {list.map((listE, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
          <li onClick={() => pushPage()}>{listE}</li>
          <button
            style={{ height: '10%', marginTop: '5%', marginLeft: '5%', border: 'none' }}
            onClick={() => setList(list.filter((list) => list !== listE))}>
            x
          </button>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blocks: state.props,
    property: state.property
  }
}

export default connect(mapStateToProps)(Page)
