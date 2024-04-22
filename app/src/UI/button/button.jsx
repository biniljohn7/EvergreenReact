import React from 'react'
import ButtonWrapper from './button.style'

const button = (props) => {
  return (
    <ButtonWrapper>
      <button
        type={props.type || 'button'}
        className={
          'btn btn-md btn-rounded button plr-25 ptb-7 text-bold ' + props.class
        }
        onClick={props.clicked}
        disabled={props.disabled}
      >
        {props.name}
      </button>
    </ButtonWrapper>
  )
}

export default button
