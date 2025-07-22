import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import { getAllMembers, duesNewMember, getDropdown } from "../../api/duesAPI";
import { getSubordinates } from "../../api/LeadershipAPI";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/input/input";
import Select from "../../UI/select/select";
import Toast from "../../UI/Toast/Toast";
import { PROFILE_OPTIONS } from "../../helper/constant";

const WIDTH_CLASS = window.innerWidth >= 1024 ? "wp-80" : "wp-100";

function OtherPurchasableList(props) {

    useEffect(() => {
        // Spn.Show();
    }, []);
    console.log(props);

    let Spn = Spinner();
    const Tst = Toast();

    return (
        <div>
            {Spn.Obj}
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="lg"
                className="signin"
                backdrop="static"
                keyboard={false}
            >
                <Wrapper>
                    <div className="plr-30 ptb-50 position-relative">
                        <div className="popup-title">Choose Purchasable Item</div>
                    </div>
                    <div
                    className="cursor-pointer text-bold close"
                    onClick={(e) => {
                        props.toggle();
                    }}
                    >
                        X
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );   
}

export default OtherPurchasableList;