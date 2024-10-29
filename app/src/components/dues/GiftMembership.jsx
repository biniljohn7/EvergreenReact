import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Gift from "../../assets/images/gift-box.png";
import Gifted from "../../assets/images/gifted.png";
import DeclineModal from "./GiftDecline";
import AddModal from "./GiftAddSelf";
import AcceptModal from "./GiftAcceptModal";

const GiftMembership = () => {
    const [isDclnOpn, setDclnOpn]   = useState(false);
    const [isRcvdOpn, setRcvdOpn]   = useState(true);
    const [isGftdOpn, setGftdOpn]   = useState(false);
    const [isCfmOpn, setCfmOpn]     = useState(false);
    const closeModal = () => setCfmOpn(false);
    const closeDcln = () => setDclnOpn(false);
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
    const[isGiftAccept,setGiftAccept]   =   useState(false);
    const[isGiftData,setGiftData]       =   useState(null);
    const openAcceptModal = (data) => {
        setGiftAccept(true);
        setGiftData(data);
    }
    const closeAcceptModal = () => {
        setGiftAccept(false);
        setGiftData(null);
    }
    const [giftData, setAllGift] = useState([{"validity":"Lifelong","gifter":"binil","price":1000,"plans":"Legacy life membership","status":"high","date":"November 10, 2025"},{"validity":"6 Months","gifter":"hari","price":600,"plans":"Associate membership","status":"low","date":"May 19, 2025"},{"validity":"1 year","gifter":"basil","price":700,"plans":"Legacy life membership","status":"high","date":"November 5, 2024"},{"validity":"Lifelong","gifter":"binil","price":1000,"plans":"Legacy life membership","status":"no","date":"September 7, 2023"},{"validity":"6 Months","gifter":"hari","price":1000,"plans":"Life Membership","status":"no","date":"July 17, 2024"}]);
    return (
    <>
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
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:false,new:'Regular Membership',validity:'1 year',plan:false,gifted:"John Doe"})}>Accept</button>
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
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:true,new:'Regular Membership',validity:'1 year',plan:'lower',gifted:"John Doe"})}>Accept</button>
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
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:true,new:'Regular Membership',validity:'1 year',plan:'higher',gifted:"John Doe"})}>Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gift-sent-container" style={{ display: isGftdOpn ? 'block' : 'none' }}>
                <div className="gift-container">
                    <div className="gift-wrapper">
                        <div className="gift-media gifted-media">
                            {<img src={Gifted} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">Accepted</span>
                                </p>
                                <p><strong>The regular membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> that you gifted was accepted by <strong>John Doe</strong> on January 18, 2025 </p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-media gifted-media">
                            {<img src={Gifted} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">Declined</span>
                                </p>
                                <p><strong>The regular membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> that you gifted has been declined by <strong>John Doe</strong> on January 18, 2025 </p>
                            </div>
                            <div className="btn-container">
                                <button type="button" className="gift-accept-btn"  onClick={(e) => setCfmOpn(true)}>Make it your's</button>
                                <button type="button" className="gift-accept-btn">Gift to someone</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="no-content">No memberships gifted!</div> */}
                </div>
            </div>
        </div>
        
        {isCfmOpn && (
            <AddModal
                isOpen={isCfmOpn}
                toggle={() => {
                    setCfmOpn(!isCfmOpn)
                }}
                closeModal={closeModal}
            />
        )}
        
        {isDclnOpn && (
            <DeclineModal
                isOpen={isDclnOpn}
                toggle={() => {
                    setDclnOpn(!isDclnOpn)
                }}
                closeDcln={closeDcln}
            //dcl={setDclnOpn}

            //data={data}
            //membershipValue={values}
            //changeURL={props.history.push}
            />
        )}
        
        {isGiftAccept && (
            <AcceptModal
                isOpen={isGiftAccept}
                toggle={() => {
                    setGiftAccept(!isGiftAccept)
                }}
                closeAccModal={closeAcceptModal}
                data={isGiftData}
            />
           
        )}
    </>

    );
}

export default GiftMembership;