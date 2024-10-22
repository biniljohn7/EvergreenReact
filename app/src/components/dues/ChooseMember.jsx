import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
//import { payment as enhancer } from "./enhancer";

const ChooseMember = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="md"
                className="signup"
            >

                {console.log(props)}
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

                        {props.data.list && props.data.list.length > 0 ? (
                            <div className="container">
                                <div className="mbr-srch">
                                    <div className="srch-bar">
                                        <input type="text" name="key" className="key-inp" />
                                        <button className="srch-btn">
                                            <span class="material-symbols-outlined">search</span>
                                        </button>
                                    </div>
                                    {
                                        props.data.list.map((mbr) => {
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
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                No record found!
                            </div>
                        )}
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );
};

//export default enhancer(ChooseMember);
export default ChooseMember;