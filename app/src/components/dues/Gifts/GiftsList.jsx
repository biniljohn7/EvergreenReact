// libraries
import React, { useEffect, useState } from 'react'
import Pix from "../../../helper/Pix"

// page libs
import { FetchGiftList, FetchGiftedList } from "../../../api/duesAPI";
import { Wrapper } from './GiftsLists.style'

//Modals
import DeclineModal from "./GiftDecline";

// loading images
import Gift from "../../../assets/images/gift-box.png";
import Gifted from "../../../assets/images/gifted.png";

function GiftsList({ ops }) {

    const [ListLoading, setListLoading] = useState(true);
    const [ListError, setListError] = useState(false);
    const [ListPgn, setListPgn] = useState(0);
    const [ListTotal, setListTotal] = useState(0);

    const [isDclnData, setDclnData] = useState(null);
    const closeDcln = () => setDclnData(null);
    const openDeclineModal = (data) => {
        // setDclnOpn(true);
        setDclnData(data);
    }

    //const [isGiftData, setGiftData] = useState(null);../../assets/images/gift-box.png

    const [giftData, setgiftData] = useState([]);

    let
        comRules = {
            sent: {
                handle: FetchGiftedList
            },
            recieved: {
                handle: FetchGiftList
            }
        },
        comRule = comRules[ops.type];

    function loadGiftList(pgn) {
        pgn = pgn !== undefined ? pgn : ListPgn;

        setListLoading(true);
        setListError(false);
        setListPgn(pgn);

        comRule.handle(
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
        <Wrapper>
            <div className="gift-container">
                {
                    ListLoading ?
                        <div className="gift-list-spn">
                            <div className="pix-spinner"></div>
                        </div> :
                        null
                }
                {
                    ListPgn === 0 &&
                        giftData.length === 0 &&
                        !ListLoading ?
                            <div className="no-content">
                                No memberships recieved
                            </div> :
                        null
                }
                {
                    giftData.map((data) => {
                        return (
                            <div className="gift-wrapper">
                                <div className="gift-media">
                                    {<img src={Gift} alt="gift" />}
                                    <span className="gift-validity">
                                        {data.validity}
                                    </span>
                                </div>
                                <div className="gift-content">
                                    <div className="gift-above-btn">
                                        <p>
                                            <span className="gift-note">
                                                New Gift received
                                            </span>
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
                                        <button type='button' className="btn-main btn-purple" /* onClick={() => openAcceptModal({ giftid: data.id, current: data.have, new: data.plans, validity: data.validity, plan: data.status, gifted: data.gifter })} */>Accept</button>
                                        <button type='button' className="btn-main btn-plain btn-del" onClick={() => openDeclineModal({ id: data.id })}>Decline</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    ListError &&
                        giftData.length !== 0?
                            <div className="no-content show-more">
                                <p>List loading error</p>
                                <button
                                    type='buttons'
                                    className="btn-main btn-purple"
                                    onClick={() => {
                                        loadGiftList();
                                    }}
                                >
                                    retry
                                </button>
                            </div> :
                        null
                }
                {
                    ListTotal &&
                        !ListLoading &&
                        !ListError &&
                        ListTotal - 1 > ListPgn ?
                        <div className="no-content show-more">
                            <button type='button' className="btn-main btn-purple" onClick={() => {
                                loadGiftList(ListPgn + 1);
                            }}>
                                Show More
                            </button>
                        </div> :
                        null
                }
            </div>

            {isDclnData && (
                <DeclineModal
                    isOpen={isDclnData}
                    toggle={() => {
                        setDclnData(!isDclnData)
                    }}
                    closeDcln={closeDcln}
                    data={isDclnData}

                />
            )}
        </Wrapper>
    )
}

export default GiftsList