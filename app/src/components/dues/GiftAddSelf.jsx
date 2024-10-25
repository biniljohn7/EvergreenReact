import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";

const GiftAddSelf = (props) => {
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
                    <div className="self-alert-modal">
                        <h5>Warning!</h5>
                        <hr />
                        <p>
                            Your current membership will be downgraded/upgraded to a new membership plan.
                        </p>
                        <p>
                            <button type="button">Continue</button>
                            <button type="button" onClick={props.closeModal}>cancel</button>
                        </p>
                    </div>
                </Wrapper>
            </Modal>
        </>
    );
};

export default GiftAddSelf;