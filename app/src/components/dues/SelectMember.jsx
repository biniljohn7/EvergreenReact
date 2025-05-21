import React from "react";
import { Modal } from "reactstrap";
import Spinner from "../../UI/Spinner/Spinner";
import Wrapper from "./dues.style";

function SelectMember(props) {
  let Spn = Spinner();

  return (
    <div>
      {Spn.Obj}
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="lg"
        className="signin"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          <div className="plr-30 ptb-50 position-relative">
            <div
              className="cursor-pointer text-bold close"
              onClick={(e) => {
                props.toggle();
              }}
            >
              X
            </div>
            <div className="mbr-srch">
              <div className="srch-bar">
                <form>
                  <input
                    type="text"
                    name="key"
                    className="key-inp"
                    id="srchKey"
                  />
                  <button type="button" className="srch-btn">
                    <span class="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default SelectMember;
