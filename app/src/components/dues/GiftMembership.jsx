import React, { useEffect, useState } from "react";
import Gift from "../../assets/images/gift-box.png";
import DeclineModal from "./GiftDecline";

const GiftMembership = () => {
    const [isDclnOpn, setDclnOpn] = useState(false);

    return <>
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
                        <p><strong>John Doe hello hwkdn jjdjs jnxs sjnjni hug j</strong> has gifted you a Regular Membership</p>
                        <p className="gift-worth"><span >Worth $600</span> on  12 - Dec - 2024</p>
                    </div>
                    <div className="btn-container">
                        <button className="gift-accept-btn">Accept</button>
                        <button className="gift-decline-btn" onClick={(e)=>setDclnOpn(true)}>Decline</button>
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
                        <p><strong>John Doe hello hwkdn jjdjs jnxs sjnjni hug j</strong> has gifted you a Regular Membership</p>
                        <p className="gift-worth"><span >Worth $600</span> on  12 - Dec - 2024</p>
                    </div>
                    <div className="btn-container">
                        <button className="gift-accept-btn">Accept</button>
                        <button className="gift-decline-btn" onClick={(e)=>setDclnOpn(true)}>Decline</button>
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
                        <p><strong>John Doe hello hwkdn jjdjs jnxs sjnjni hug j</strong> has gifted you a Regular Membership</p>
                        <p className="gift-worth"><span >Worth $600</span> on  12 - Dec - 2024</p>
                    </div>
                    <div className="btn-container">
                        <button className="gift-accept-btn">Accept</button>
                        <button className="gift-decline-btn" onClick={(e)=>setDclnOpn(true)}>Decline</button>
                    </div>
                </div>
            </div>
        </div>

        {isDclnOpn && (
        <DeclineModal
            isOpen={isDclnOpn}
            toggle={() => {
                setDclnOpn(!isDclnOpn)
            }}
            //data={data}
            //membershipValue={values}
            //changeURL={props.history.push}
        />
    )}
    </>

    
}

export default GiftMembership;