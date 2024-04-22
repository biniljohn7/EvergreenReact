import React from 'react'
import TextareaWrapper from './textarea.style'
import Switch from 'react-switch'
import { HEADER_COLOR } from '../../helper/constant'

const textarea = (props) => {
  return (
    <TextareaWrapper>
      <div className="position-relative">
        <label className={['insidelabelmain', props.fontSize].join(' ')}>
          {props.label}
        </label>
        {props.required ? <span className="red--text"> *</span> : null}
        {props.switchPresent && (
          <Switch
            onChange={(checked) => {
              props.switchChange(checked)
            }}
            checked={props.checked}
            onColor="#EAEAEA"
            onHandleColor={HEADER_COLOR}
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={40}
            className="profile-switch"
          />
        )}
      </div>

      {props.subtext && <div className="mt-3 fs-12">{props.subtext}</div>}
      <textarea
        rows={props.rows}
        cols={props.cols}
        placeholder={props.placeholder}
        id={props.id}
        className={[
          'input-switch-main pt-11 pl-15 mt-10',
          props.contentFontSize,
        ].join(' ')}
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
