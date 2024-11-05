import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Wrapper } from './GiftsLists.style'

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
                    {props.data.currentplan ? (
                        <div className="self-alert-modal">
                            <h5>ACCEPT YOUR GIFT.</h5>
                            <hr />
                            {props.data.grade === 'high' && (
                            <>
                                <p>The <strong>{props.data.newplan}</strong> gifted to you by <strong>{props.data.giftedby}</strong> with a validity of <strong>{props.data.validity}</strong> has a higher value than your current membership plan.</p>
                                <p>You can apply the membership now or after expiring the current plan.</p>
                                <p>
                                    <button type="button" className="btn-main btn-purple">Apply now</button>
                                    <button type="button" className="btn-main btn-plain">apply after expiry</button>
                                </p>
                            </>
                            
                            )}
                            { props.data.grade === 'low' && (
                                <>
                                    <p>The <strong>{props.data.newplan}</strong> gifted to you by <strong>{props.data.giftedby}</strong> with a validity of <strong>{props.data.validity}</strong> has a lower value than your current membership plan.</p>
                                    <p>You can apply the membership now or after expiring the current plan.</p>
                                    <p>
                                        <button type="button" className="btn-main btn-purple">Apply now</button>
                                        <button type="button" className="btn-main btn-plain">apply after expiry</button>
                                    </p>
                                </>
                            )}

                            
                        </div>
                    ):(
                        <div className="self-alert-modal">
                            <h5>GIFT ACCEPTED.</h5>
                            <hr />
                            <p>
                                The <strong>{props.data.newplan}</strong> gifted to you by <strong>{props.data.giftedby}</strong> with a validity of <strong>{props.data.validity}</strong> is added to your account. 
                            </p>
                            <p>
                                <button type="button" className="btn-main btn-purple"  onClick={props.closeAccModal}>OK</button>
                            </p>
                        </div>
                    )}
                    
                </Wrapper>
            </Modal>
        </>
    );
};

export default GiftAcceptModal;