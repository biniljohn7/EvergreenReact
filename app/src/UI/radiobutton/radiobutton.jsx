import React from "react";
import RadioButtonWrapper from "./radiobutton.style";

const radioButton = (props) => {
  const id = props.show ? props.id1 : props.id;

  return (
    <RadioButtonWrapper>
      <div className={["custom-control custom-radio", props.padding].join(" ")}>
        <input
          type="radio"
          id={id}
          name={props.name}
          className="custom-control-input"
          checked={props.checked}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label className="custom-control-label mobileview" htmlFor={id}>
          {props.label}
        </label>
      </div>
    </RadioButtonWrapper>
  );
};

export default radioButton;
