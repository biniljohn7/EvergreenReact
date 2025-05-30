import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";

const GiftAcceptModal = (props) => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="md"
        className="decline-modal"
      >
        <Wrapper>
          {props.data.current ? (
            <div className="self-alert-modal">
              <h5>ACCEPT YOUR GIFT.</h5>
              <hr />
              {props.data.plan === "high" && (
                <>
                  <p>
                    The <strong>{props.data.new}</strong> gifted to you by{" "}
                    <strong>{props.data.gifted}</strong> with a validity of{" "}
                    <strong>{props.data.validity}</strong> has a higher value
                    than your current membership plan.
                  </p>
                  <p>
                    You can apply the membership now or after expiring the
                    current plan.
                  </p>
                  <p>
                    <button type="button apply-now">Apply now</button>
                    <button type="button apply-later">
                      apply after expiry
                    </button>
                  </p>
                </>
              )}
              {props.data.plan === "low" && (
                <>
                  <p>
                    The <strong>{props.data.new}</strong> gifted to you by{" "}
                    <strong>{props.data.gifted}</strong> with a validity of{" "}
                    <strong>{props.data.validity}</strong> has a lower value
                    than your current membership plan.
                  </p>
                  <p>
                    You can apply the membership now or after expiring the
                    current plan.
                  </p>
                  <p>
                    <button type="button">Apply now</button>
                    <button type="button">apply after expiry</button>
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="self-alert-modal">
              <h5>GIFT ACCEPTED.</h5>
              <hr />
              <p>
                The <strong>{props.data.new}</strong> gifted to you by{" "}
                <strong>{props.data.gifted}</strong> with a validity of{" "}
                <strong>{props.data.validity}</strong> is added to your account.
              </p>
              <p>
                <button type="button" onClick={props.closeAccModal}>
                  OK
                </button>
              </p>
            </div>
          )}
        </Wrapper>
      </Modal>
    </>
  );
};

export default GiftAcceptModal;
