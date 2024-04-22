import React from "react";
import BackdropWrapper from "./backdrop.style";

const backdrop = props => {
  return (
    <BackdropWrapper>
      {/* <div className="backdrop"></div>  */}
      {props.show ? (
        <div className="backdrop" onClick={props.clicked}>
          {" "}
        </div>
      ) : null}
    </BackdropWrapper>
  );
};

export default backdrop;
