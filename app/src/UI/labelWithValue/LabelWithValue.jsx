import React from 'react'
import Wrapper from './labelWithValue.style'

const LabelWithValue = (props) => {
  return (
    <Wrapper>
      <div className="label-with-value">
        <label>{props.label}</label>
        <div>{props.value}</div>
      </div>
    </Wrapper>
  )
}

export default LabelWithValue
