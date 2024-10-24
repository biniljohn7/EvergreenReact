import React, { useEffect, useState } from "react";
import Gift from "../../assets/images/gift-box.png";
import DeclineModal from "./GiftDecline";

const GiftMembership = () => {
    const [isDclnOpn, setDclnOpn] = useState(false);
    const [isRcvdOpn, setRcvdOpn] = useState(true);
    const [isGftdOpn, setGftdOpn] = useState(false);
    const handleClick = (e) => {
        let btn = e.target.getAttribute("data-id");
        if (btn == 'received') {
            setRcvdOpn(true);
            setGftdOpn(false);
        }
        if (btn == 'gifted') {
            setRcvdOpn(false);
            setGftdOpn(true);
        }
    };

    return <>
        <div className="container all-gifts">
            <div className="gift-tabs">
                <button id="rcvd" className={isRcvdOpn ? 'gift-received active' : 'gift-received'} data-id="received" onClick={handleClick}>Recieved</button>
                <button id="gftd" className={isGftdOpn ? 'gift-sent active' : 'gift-sent'} data-id="gifted" onClick={handleClick}>Gifted</button>
            </div>
            <div className="gift-received-container" style={{ display: isRcvdOpn ? 'block' : 'none' }}>
                <div className="gift-container">
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn">Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn">Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn">Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gift-sent-container" style={{ display: isGftdOpn ? 'block' : 'none' }}>
                <div className="gift-container">
                    <div className="gift-wrapper">
                        <div className="gift-content">
                            <p>Accepted</p>
                            <p>The regular membership worth $600 that you gifted was accepted by John Doe on January 18, 2025.</p>
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-content">
                            <p>Declined</p>
                            <p>The regular membership worth $600 that you gifted has been declined by John Doe on January 18, 2025</p>
                            <p><button>Make it your's</button></p>
                        </div>
                    </div>
                    {/* <div className="no-content">No memberships gifted!</div> */}
                </div>
            </div>

        </div>



        {isDclnOpn && (
            <DeclineModal
                isOpen={isDclnOpn}
                toggle={() => {
                    setDclnOpn(!isDclnOpn)
                }}
                dcl={setDclnOpn}

            //data={data}
            //membershipValue={values}
            //changeURL={props.history.push}
            />
        )}
    </>


}

export default GiftMembership;