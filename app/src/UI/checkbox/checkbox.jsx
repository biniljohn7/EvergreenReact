import React from "react";
import CheckboxWrapper from "./checkbox.style";

const checkbox = (props) => {
  const id = props.show ? props.id1 : props.id;

  return (
    <CheckboxWrapper>
      <div
        className={["custom-control custom-checkbox", props.margin].join(" ")}
      >
        <input
          type="checkbox"
          id={id}
          name={props.name}
          className="custom-control-input"
          checked={props.checked}
          // style={{ height: "24px" }}
          onChange={props.onChange}
          disabled={props.isDisabled}
        />
        <label
          htmlFor={id}
          className={[
            "custom-control-label term mobileview",
            props.labelClass,
          ].join(" ")}
        >
          {props.label}
        </label>
      </div>
    </CheckboxWrapper>
  );
};

export default checkbox;
