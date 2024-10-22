import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
//import { payment as enhancer } from "./enhancer";

const GiftDecline = (props) => {
    const [isOthChk, othCheck] = useState(false);
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="md"
                className="decline-modal"
            >
                <Wrapper>
                    <div
                        className={
                            "ptb-20 m-auto" +
                            (window.innerWidth < 768
                                ? " plr-10 "
                                : window.innerWidth === 768
                                    ? " plr-15 "
                                    : " plr-20 ")
                        }
                    >
                        <h5>Choose why you want to decline the gift membership?</h5>
                        <hr />
                        <form id="declineForm">
                            <div className="decline-options">
                                <label><input type="radio" name="decline-option"  onChange={(e) => { othCheck(false);  }} /> My membership plan doesn't expire soon.</label>
                            </div>
                            <div className="decline-options">
                                <label><input type="radio"  name="decline-option"  onChange={(e) => { othCheck(false);  }} /> Option 2</label>
                            </div>
                            <div className="decline-options">
                                <label><input type="radio" name="decline-option"  onChange={(e) => { othCheck(false);  }} /> Option 3</label>
                            </div>
                            <div className="decline-options">
                                <label><input type="radio" name="decline-option"  onChange={(e) => { othCheck(false);  }} /> Personal reasons, i dont want to disclose.</label>
                            </div>
                            <div className="decline-options">
                                <label><input type="radio" name="decline-option"  onChange={(e) => { othCheck(false);  }}  /> I am not interested in continuing the membership.</label>
                            </div>
                            <div className="decline-options">
                                <label><input type="radio" name="decline-option" onChange={(e) => { othCheck(true);  }} /> Others</label>
                            </div>
                            <div className="decline-options others-field"  style={{ display: isOthChk ? 'block' : 'none' }}>
                                <textarea name="others-reason" id="" rows={2}></textarea>
                            </div>
                            <div className="decline-options submit">
                                <button type="submit" className="btn btn-submit">Decline</button>
                                <button type="button" className="btn btn-cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );
};

//export default enhancer(GiftDecline);
export default GiftDecline;