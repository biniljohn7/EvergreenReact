import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import { getAllMembers } from "../../api/duesAPI";
//import { payment as enhancer } from "./enhancer";

const ChooseMember = (props) => {
    const [mbrData, setMbrData] = useState(null);

    useEffect(() => {
        getAllMembers()
            .then((res) => {
                if (res.success === 1) {
                    setMbrData(res.data);
                } else { }
            })
            .catch((err) => { });

    }, []);

    const showMembers = (e) => {
        //Spn.Show();
        getAllMembers({
            key: document.getElementById('srchKey').value
        })
            .then((res) => {

                if (res.success === 1) {
                    setMbrData(res.data);
                } else { }
            })
            .catch((err) => {
                //
            }).finally(() => {
                //Spn.Hide();
            });

        e.preventDefault();
        return false;
    };
    return (
        <div>
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
                                    mbrData && mbrData.list && mbrData.list.length > 0 ? (
                                        mbrData.list.map((mbr) => {
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
                                                        <span className="btn add-btn">Add</span>
                                                    </div>
                                                </div>
                                            )
                                        })
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