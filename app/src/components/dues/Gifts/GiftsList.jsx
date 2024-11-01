// libraries
import React, { useEffect, useState } from 'react'

// page libs
import { FetchGiftList, FetchGiftedList } from "../../../api/duesAPI";
import { Wrapper } from './GiftsLists.style'

// loading images
import Gift from "../../../assets/images/gift-box.png";
import Gifted from "../../../assets/images/gifted.png";

function GiftsList({ ops }) {

    const [ListLoading, setListLoading] = useState(true);
    const [ListError, setListError] = useState(false);
    const [ListPgn, setListPgn] = useState(0);
    const [ListTotal, setListTotal] = useState(0);

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
                                    content
                                </div>
                            </div>
                        )
                    })
                }
                {
                    ListError ?
                        <div className="text-center ">
                            <div className="pt30 mb10">
                                List loading error
                            </div>
                            <div className="no-conten">
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
        </Wrapper>
    )
}

export default GiftsList