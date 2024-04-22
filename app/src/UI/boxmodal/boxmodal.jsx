import React from "react";
import ModalWrapper from "./boxmodal.style";

const modal = (props) => {
  return (
    <ModalWrapper>
      <div className="boxmain mt-20">
        <div>
          <label
            className={[
              "labelmain container-fluid pt-14 pl-25 pb-19 fs-17",
              props.styles,
            ].join(" ")}
          >
            {props.label}
          </label>
          {props.body}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default modal;
