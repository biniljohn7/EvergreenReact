// libraries
import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Pix from "../../../helper/Pix"

// page libs
import { FetchGiftList } from "../../../api/duesAPI";
import Wrapper from "../dues.style";

// page components
import GiftsList from "./GiftsList";

import DeclineModal from "./GiftDecline";
import AddModal from "./GiftAddSelf";
import AcceptModal from "./GiftAcceptModal";
//import GiftCard from "./cards/GiftCard";
// import ReceivedMemberships from "./cards/ReceivedMemberships";
// import GiftedMemberships from "./cards/GiftedMemberships";

// loading images
import Gift from "../../../assets/images/gift-box.png";
import Gifted from "../../../assets/images/gifted.png";

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









            <div className="container all-gifts">
                <div className="gift-tabs">
                    <button
                        id="rcvd"
                        className={isRcvdOpn ? 'gift-received active' : 'gift-received'}
                        data-id="received"
                        onClick={handleClick}
                    >
                        Recieved
                    </button>
                    <button
                        id="gftd"
                        className={isGftdOpn ? 'gift-sent active' : 'gift-sent'}
                        data-id="gifted"
                        onClick={handleClick}
                    >
                        Gifted
                    </button>
                </div>
                <div
                    className="gift-received-container"
                    style={{ display: isRcvdOpn ? 'block' : 'none' }}
                >
                    <GiftsList ops={{
                        type: 'recieved'
                    }} />
                </div>
                <div
                    className="gift-sent-container"
                    style={{ display: isGftdOpn ? 'block' : 'none' }}
                >
                    <GiftsList ops={{
                        type: 'sent'
                    }} />
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