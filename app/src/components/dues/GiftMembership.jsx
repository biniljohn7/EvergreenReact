// libraries
import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Pix from "../../helper/Pix"

// page libs
import { FetchGiftList } from "../../api/duesAPI";
import Wrapper from "./dues.style";

// page components
import DeclineModal from "./GiftDecline";
import AddModal from "./GiftAddSelf";
import AcceptModal from "./GiftAcceptModal";
import GiftCard from "./Gifts/GiftCard";

// loading images
import Gift from "../../assets/images/gift-box.png";
import Gifted from "../../assets/images/gifted.png";

const GiftMembership = () => {

    const [ListError, setListError] = useState(false);
    const [ListLoading, setListLoading] = useState(true);
    const [ListPgn, setListPgn] = useState(0);
    const [ListTotal, setListTotal] = useState(0);



    const [isDclnOpn, setDclnOpn] = useState(false);
    const [isDclnData, setDclnData] = useState(null);
    const [isRcvdOpn, setRcvdOpn] = useState(true);
    const [isGftdOpn, setGftdOpn] = useState(false);
    const [isCfmOpn, setCfmOpn] = useState(false);
    const closeModal = () => setCfmOpn(false);
    const closeDcln = () => setDclnOpn(false);
    const handleClick = (e) => {
        let btn = e.target.getAttribute("data-id");
        if (btn === 'received') {
            setRcvdOpn(true);
            setGftdOpn(false);
        }
        if (btn === 'gifted') {
            setRcvdOpn(false);
            setGftdOpn(true);
        }
    };
    const [isGiftAccept, setGiftAccept] = useState(false);
    const [isGiftData, setGiftData] = useState(null);
    const openAcceptModal = (data) => {
        setGiftAccept(true);
        setGiftData(data);
    }
    const closeAcceptModal = () => {
        setGiftAccept(false);
        setGiftData(null);
    }
    const openDeclineModal = (data) => {
        setDclnOpn(true);
        setDclnData(data);
    }

    const [giftData, setgiftData] = useState([]);

    function loadGiftList(pgn) {
        pgn = pgn !== undefined ? pgn : ListPgn;

        setListLoading(true);
        setListError(false);
        setListPgn(pgn);

        FetchGiftList(
            { pgn: pgn }
        )
            .then((data) => {
                if (data.status === 'ok') {
                    setgiftData([
                        ...giftData,
                        ...data.list
                    ]);
                    setListTotal(data.pages);

                } else {
                    setListError(true);
                }
            })
            .catch((err) => {
                setListError(true);
            })
            .finally(() => {
                setListLoading(false);
            });

    }

    useEffect(() => {
        loadGiftList();
    }, []);


    return (
        <>
            <GiftCard data={{
                title: 'Text 1',
                body: "Body Text 2"
            }} />
            <div className="container all-gifts">
                <div className="gift-tabs">
                    <button id="rcvd" className={isRcvdOpn ? 'gift-received active' : 'gift-received'} data-id="received" onClick={handleClick}>Recieved</button>
                    <button id="gftd" className={isGftdOpn ? 'gift-sent active' : 'gift-sent'} data-id="gifted" onClick={handleClick}>Gifted</button>
                </div>
                <div className="gift-received-container" style={{ display: isRcvdOpn ? 'block' : 'none' }}>
                    <div className="gift-container">
                        {
                            ListPgn === 0 &&
                                giftData.length === 0 &&
                                !ListLoading ?
                                <div className="text-center pt50 mb50">
                                    No gift recieved
                                </div> :
                                null
                        }
                        {
                            giftData.map((data) => {
                                return (
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
                                                <p>
                                                    <strong>
                                                        {data.gifter}
                                                    </strong>
                                                    {' has gifted you a '}
                                                    <strong>
                                                        {data.plans}
                                                    </strong>
                                                </p>
                                                <p className="gift-worth">
                                                    <span>
                                                        {'worth ' + Pix.dollar(data.price)}
                                                    </span>
                                                    {' on ' + data.date}
                                                </p>
                                            </div>
                                            <div className="btn-container">
                                                <button className="gift-accept-btn" onClick={() => openAcceptModal({ giftid: data.id, current: data.have, new: data.plans, validity: data.validity, plan: data.status, gifted: data.gifter })}>Accept</button>
                                                <button className="gift-decline-btn" onClick={() => openDeclineModal({ id: data.id })}>Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            ListLoading ?
                                <div className="gift-list-spn">
                                    <div className="pix-spinner"></div>
                                </div> :
                                null
                        }
                        {
                            ListError ?
                                <div className="text-center ">
                                    <div className="pt30 mb10">
                                        List loading error
                                    </div>
                                    <div className="">
                                        <span
                                            className="btn btn-sm"
                                            onClick={() => {
                                                loadGiftList();
                                            }}
                                        >
                                            retry
                                        </span>
                                    </div>
                                </div> :
                                null
                        }
                        {
                            ListTotal &&
                                !ListLoading &&
                                !ListError &&
                                ListTotal - 1 > ListPgn ?
                                <div className="text-center pt20 mb10">
                                    <span className="btn" onClick={() => {
                                        loadGiftList(ListPgn + 1);
                                    }}>
                                        Show More
                                    </span>
                                </div> :
                                null
                        }
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
                                    <button type="button" className="gift-accept-btn" onClick={(e) => setCfmOpn(true)}>Make it your's</button>
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