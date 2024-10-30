import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Gift from "../../assets/images/gift-box.png";
import Gifted from "../../assets/images/gifted.png";
import DeclineModal from "./GiftDecline";
import AddModal from "./GiftAddSelf";
import AcceptModal from "./GiftAcceptModal";
import Wrapper from "./dues.style";

const GiftMembership = () => {
    const [isDclnOpn, setDclnOpn]   = useState(false);
    const [isDclnData, setDclnData]   = useState(null);
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
    const openDeclineModal = (data)=>{
        setDclnOpn(true);
        setDclnData(data);
    }
    const [giftData, setAllGift] = useState([{"id":0,"validity":"1 year","gifter":"Basil","price":1000,"plans":"Legacy life membership","status":"low","have":false,"date":"September 15, 2023"},{"id":1,"validity":"Lifelong","gifter":"Hari","price":600,"plans":"Life Membership","status":false,"have":false,"date":"August 4, 2023"},{"id":2,"validity":"6 Months","gifter":"Basil","price":1000,"plans":"Associate membership","status":false,"have":false,"date":"September 13, 2023"},{"id":3,"validity":"Lifelong","gifter":"Saji","price":600,"plans":"Associate membership","status":"low","have":true,"date":"July 13, 2023"},{"id":4,"validity":"1 year","gifter":"Hari","price":700,"plans":"Regular Membership","status":false,"have":true,"date":"September 1, 2024"}]);
    return (
    <>
        <div className="container all-gifts">
            <div className="gift-tabs">
                <button id="rcvd" className={isRcvdOpn ? 'gift-received active' : 'gift-received'} data-id="received" onClick={handleClick}>Recieved</button>
                <button id="gftd" className={isGftdOpn ? 'gift-sent active' : 'gift-sent'} data-id="gifted" onClick={handleClick}>Gifted</button>
            </div>
            <div className="gift-received-container" style={{ display: isRcvdOpn ? 'block' : 'none' }}>
                <div className="gift-container">
                {giftData && (
                    giftData.map((data)=>{
                        return(
                            <>
                                <div className="gift-wrapper">
                                    <div className="gift-media">
                                        {<img src={Gift} alt="gift" />}
                                        <span className="gift-validity">{data.validity}</span>
                                    </div>
                                    <div className="gift-content">
                                        <div className="gift-above-btn">
                                            <p>
                                                <span className="gift-note">New Gift received</span>
                                            </p>
                                            <p><strong>{data.gifter}</strong> has gifted you a <strong>{data.plans}</strong></p>
                                            <p className="gift-worth"><span >worth ${data.price}</span> on  {data.date}
                                            </p>
                                        </div>
                                        <div className="btn-container">
                                            <button className="gift-accept-btn" onClick={()=>openAcceptModal({giftid:data.id,current:data.have,new:data.plans,validity:data.validity,plan:data.status,gifted:data.gifter})}>Accept</button>
                                            <button className="gift-decline-btn" onClick={()=>openDeclineModal({id:data.id})}>Decline</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        );
                    })
                    
                )}
                </div>
                {/* <div className="gift-container">
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
                </div> */}
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
                data={isDclnData}
            
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