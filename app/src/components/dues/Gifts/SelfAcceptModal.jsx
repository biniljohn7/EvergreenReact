import React, { useState } from "react";
import { Modal } from "reactstrap";

import { Wrapper } from './GiftsLists.style'

import { selfAccept } from "../../../api/duesAPI";



const SelfAcceptModal = (props) => {
    const [giftId, setGiftId] = useState(props.data.giftId);
    const [isSuccess, setSuccess] = useState(false);
    const [isSpinner, setSpinner] = useState(false);
    const [isNEroor, setNError] = useState(false);

    const acceptGiftHandler = (data) => {
        const sendData = {
            giftId: giftId,
            acceptnow: data.acceptNow,
        };
        selfAccept({
            sendData
        })
            .then((result) => {
                console.log(result)
                if (result.success === 1) {
                    setSuccess(true);
                    //
                    props.remove(giftId);
                } else {
                    setNError(true);
                }
                setSpinner(false);
            })
            .catch((err) => {
                setNError(true);
                setSpinner(false);
            })
            .finally(() => {

                //props.closeDcln();
            });
    }
    return (

        <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            centered
            size="md"
            className="decline-modal"
        >
            <Wrapper>
                {isSuccess ?
                    <div className="p-4 text-center">
                        <p>You have successfully added the membership plan.</p>
                        <p className="decline-options submit text-center mb-0">
                            <button type="button" className="btn-main btn-purple btn-long" onClick={props.closeAccModal} >OK</button>
                        </p>
                    </div>
                    :

                    <div className="self-alert-modal">
                        <h5>ADD MEMBERSHIP TO YOURSELF</h5>
                        <hr />
                        {
                            isNEroor ?
                                <div className="alert alert-danger mt-5 p-2"><small>Error! Please try again.</small></div>
                                : null
                        }
                        <p>
                            <strong>{props.data.newplan}</strong>
                            {' with a validity of '}
                            <strong>{props.data.validity}</strong>
                            {' you gifted was declined.'}

                        </p>
                        {
                            !isSpinner ?
                                <p>
                                    <button type="button" className="btn-main btn-purple" onClick={() => acceptGiftHandler({ id: props.data.id, acceptNow: "now" })}>Own the plan now </button>
                                    <button type="button" className="btn-main btn-plain" onClick={props.closeAccModal}>Cancel</button>
                                </p>
                                :
                                <div className="decline-spinner-show">
                                    <div className="pix-spinner"></div>
                                </div>
                        }
                    </div>

                }

            </Wrapper>
        </Modal>

    );
};

export default SelfAcceptModal;