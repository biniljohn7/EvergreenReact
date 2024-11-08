import React, { useState } from "react";
import { Modal } from "reactstrap";

import { Wrapper } from './GiftsLists.style'

import { acceptGift } from "../../../api/duesAPI";



const GiftAcceptModal = (props) => {
    const [giftId, setGiftId] = useState(props.data.giftId);
    const [isSuccess, setSuccess] = useState(false);
    const [isSpinner, setSpinner] = useState(false);
    const [isNEroor, setNError] = useState(false);

    const acceptGiftHandler = (data) => {
        const sendData = {
            giftId: giftId,
            acceptnow: data.acceptNow,
        };
        acceptGift({
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
        <>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="md"
                className="decline-modal"
            >
                <Wrapper>
                    {   isSuccess ? 
                            <div className="p-4 text-center">
                                <p>You have declined the gift membership received!</p>
                                <p className="decline-options submit text-center mb-0">
                                    <button type="button" className="btn-main btn-purple btn-long"  onClick={props.closeAccModal} >OK</button>
                                </p>
                            </div>
                        :
                        
                        props.data.currentplan ? (
                            <div className="self-alert-modal">
                                <h5>ACCEPT YOUR GIFT.</h5>
                                <hr />
                                {
                                    isNEroor ?
                                        <div className="alert alert-danger mt-5 p-2"><small>Error! Please try again.</small></div>
                                        : null
                                }
                                {props.data.grade === 'different' ?
                                    <>
                                        <p>The <strong>{props.data.newplan}</strong> gifted to you by <strong>{props.data.giftedby}</strong> with a validity of <strong>{props.data.validity}</strong> is different from your current membership plan.</p>
                                        <p><small>You can apply the membership now or after expiring the current plan.</small></p>
                                        {
                                            !isSpinner?
                                            <p>
                                                <button type="button" className="btn-main btn-purple" onClick={() => acceptGiftHandler({ acceptNow: "now" })}>Apply now</button>
                                                <button type="button" className="btn-main btn-plain" onClick={() => acceptGiftHandler({ acceptNow: "later" })}>apply after expiry</button>
                                            </p>
                                        :
                                            <div className="decline-spinner-show">
                                                <div className="pix-spinner"></div>
                                            </div>
                                        }    
                                    </>

                                    :
                                    <>
                                        <p>
                                            <strong>{props.data.giftedby}</strong>
                                            {' gifted you a '}
                                            <strong>{props.data.newplan}</strong>
                                            {' with a validity of '}
                                            <strong>{props.data.validity}</strong>
                                        </p>
                                        <p><small>You can apply the membership now or after expiring the current plan.</small></p>
                                        {
                                            !isSpinner?
                                            <p>
                                                <button type="button" className="btn-main btn-purple" onClick={() => acceptGiftHandler({ acceptNow: "now" })}>Apply now</button>
                                                <button type="button" className="btn-main btn-plain" onClick={() => acceptGiftHandler({ acceptNow: "later" })}>apply after expiry</button>
                                            </p>
                                        :
                                            <div className="decline-spinner-show">
                                                <div className="pix-spinner"></div>
                                            </div>
                                        }    
                                    </>
                                }
                            </div>
                        ) : (
                            <div className="self-alert-modal">
                                <h5>ACCEPT YOUR GIFT.</h5>
                                <hr />
                                <p>
                                    <strong>{props.data.giftedby}</strong>
                                    {' gifted you a '}
                                    <strong>{props.data.newplan}</strong>
                                    {' with a validity of '}
                                    <strong>{props.data.validity}</strong>
                                </p>
                                {
                                    !isSpinner?
                                <p>
                                    <button type="button" className="btn-main btn-purple" onClick={() => acceptGiftHandler({ acceptNow: "now" })}>Accept now</button>
                                    <button type="button" className="btn-main btn-plain"  onClick={props.closeAccModal}>Cancel</button>
                                </p>
                                    :
                                    <div className="decline-spinner-show">
                                        <div className="pix-spinner"></div>
                                    </div>
                                }
                            </div>
                        )

                    }

                </Wrapper>
            </Modal>
        </>
    );
};

export default GiftAcceptModal;