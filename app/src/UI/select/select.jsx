import React from "react";
import SelectWrapper from "./select.style";

const Select = (props) => {
  return (
    <SelectWrapper>
      {props.label && props.label !== "" ? (
        <div className="">
          <label
            className={["insidelabelmain mb-10", props.fontSize].join(" ")}
          >
            {props.label}
          </label>
          {props.required ? <span className="red--text"> *</span> : null}
        </div>
      ) : null}

      <select
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        style={props.style}
        className={[
          "inputmain pa-10",
          props.contentFontSize,
          props.className,
        ].join(" ")}
        disabled={props.disabled}
      >
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.options &&
          props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </SelectWrapper>
  );
};

export default Select;
