import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import { getAllMembers } from "../../api/duesAPI";
import Spinner from "../../UI/Spinner/Spinner";
//import { payment as enhancer } from "./enhancer";

const ChooseMember = (props) => {
    const [mbrData, setMbrData] = useState(null);
    let Spn = Spinner();
    let pgn = 1;

    useEffect(() => {
        Spn.Show();
        getAllMembers(
            {
                pgn: pgn
            }
        )
            .then((res) => {
                if (res.success === 1) {
                    setMbrData(res.data);
                } else { }
                Spn.Hide();
            })
            .catch((err) => { });

    }, []);

    const showMembers = (e, flg = false) => {
        Spn.Show();
        getAllMembers({
            key: document.getElementById('srchKey').value,
            pgn: pgn
        })
            .then((res) => {

                if (res.success === 1) {

                    if (flg == true) {
                        setMbrData((prevData) => ({
                            ...prevData,
                            list: [...prevData.list, ...res.data.list],
                            currentPageNo: res.data.currentPageNo,
                            totalPages: res.data.totalPages
                        }));
                    } else {
                        setMbrData(res.data);
                    }
                } else { }
            })
            .catch((err) => {
                //
            }).finally(() => {
                Spn.Hide();
            });

        e.preventDefault();
        return false;
    };

    const showMore = (e, cp, apndFlg) => {
        pgn = cp + 1;
        showMembers(e, apndFlg);
    }

    const handleClick = (event) => {
        const personDetails = {
            id: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            avatarUrl: event.target.getAttribute('data-avatar')
        };
        props.addContent(personDetails);
    };

    return (
        <div>
            {Spn.Obj}
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="md"
                className="signup"
            >

                <Wrapper>
                    <div
                        className={
                            "ptb-50 m-auto " +
                            (window.innerWidth < 768
                                ? " plr-20 "
                                : window.innerWidth === 786
                                    ? " plr-30 "
                                    : " plr-40 ")
                        }
                    >
                        <div className="container">
                            <div className="mbr-srch">
                                <div className="srch-bar">
                                    <form onSubmit={(e) => showMembers(e)}>
                                        <input type="text" name="key" className="key-inp" id="srchKey" />
                                        <button
                                            type="button"
                                            className="srch-btn"
                                            onClick={(e) => showMembers(e)}
                                        >
                                            <span class="material-symbols-outlined">search</span>
                                        </button>
                                    </form>
                                </div>
                                {
                                    mbrData && mbrData.totalPages ? (
                                        mbrData.list && mbrData.list.length > 0 ? (
                                            <>
                                                {mbrData.list.map((mbr) => {
                                                    return (
                                                        <div className="each-mbr">
                                                            <div className="avatar-sec">
                                                                {mbr.avatar ? (
                                                                    <div className="mbr-img">
                                                                        <img src={mbr.avatar} alt="" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="no-img">
                                                                        <span class="material-symbols-outlined icn">
                                                                            person
                                                                        </span>
                                                                    </div>
                                                                )
                                                                }
                                                            </div>
                                                            <div className="nam-sec">
                                                                {mbr.name}
                                                            </div>
                                                            <div className="actn">
                                                                <span
                                                                    className="btn add-btn"
                                                                    onClick={handleClick}
                                                                    data-id={mbr.id}
                                                                    data-name={mbr.name}
                                                                    data-avatar={mbr.avatar}
                                                                >Add</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {mbrData.totalPages && mbrData.currentPageNo && (mbrData.totalPages > mbrData.currentPageNo) ? (
                                                    <div className="show-more">
                                                        <span className="btn" onClick={(e) => showMore(e, mbrData.currentPageNo, true)}>
                                                            Show more
                                                        </span>
                                                    </div>
                                                ) : ''}
                                            </>
                                        ) : ('')
                                    ) : (
                                        <div className="text-center">
                                            No members found!
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </Wrapper>
            </Modal>
        </div>
    );
};

//export default enhancer(ChooseMember);
export default ChooseMember;