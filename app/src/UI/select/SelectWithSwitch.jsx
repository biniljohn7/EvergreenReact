import React from "react";
import Select from "react-select";
import Switch from "react-switch";

const SelectComponent = (props) => {
  return (
    <React.Fragment>
      <div className="position-relative">
        <label className="fs-16 mb-5 text-dark">{props.label}</label>
        {props.switchPresent && (
          <Switch
            onChange={(checked) => {
              console.log(checked);
            }}
            checked={true}
            onColor="#EAEAEA"
            onHandleColor="#34BEBF"
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
      <Select
        placeholder={props.placeholder}
        options={props.options}
        styles={{
          control: (value) => {
            return {
              ...value,
              minHeight: "44px",
              width: props.width,
            };
          },
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "14px",
            };
          },
        }}
        onChange={(selectedOp) => props.onChange(selectedOp)}
        value={props.value}
      />
    </React.Fragment>
  );
};

export default SelectComponent;
