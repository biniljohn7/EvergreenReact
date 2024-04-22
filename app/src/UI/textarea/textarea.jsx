import React from 'react'
import TextareaWrapper from './textarea.style'

const textarea = (props) => {
  return (
    <TextareaWrapper>
      <label className={['insidelabelmain', props.fontSize].join(' ')}>
        {props.label}
      </label>
      {props.required ? <span className="red--text"> *</span> : null}

      <textarea
        rows={props.rows}
        cols={props.cols}
        placeholder={props.placeholder}
        id={props.id}
        className={['inputmain pt-11 pl-15 mt-10', props.contentFontsize].join(
          ' ',
        )}
        onChange={props.onChange}
        onBlur={props.onBlur}
        maxLength={props.maxLength}
        value={props.value}
        disabled={props.disabled || false}
      ></textarea>
    </TextareaWrapper>
  )
}

export default textarea
