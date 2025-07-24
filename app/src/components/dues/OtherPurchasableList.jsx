import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import Pix from "../../helper/Pix";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";

const WIDTH_CLASS = window.innerWidth >= 1024 ? "wp-80" : "wp-100";

function OtherPurchasableList(props) {
    const [purchaseList, setPurchaseList] = useState(null);

    const ChooseItem = (event) => {
        const selectedItem = {
            id: parseInt(event.target.getAttribute('data-id')),
            title: event.target.getAttribute('data-title'),
            amount: event.target.getAttribute('data-amount')
        };
        
        props.purchasableItem(selectedItem);
    }

    useEffect(() => {
        Spn.Show();
        if(props.othPurLists) {
            Spn.Hide();
            setPurchaseList(props.othPurLists);
        }
    }, []);

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
                className="purchasable-itms"
                backdrop="static"
                keyboard={false}
            >
                <Wrapper>
                    <div className="plr-30 ptb-50 position-relative puritm-popup">
                        <div className="popup-title">Choose Item</div>
                        <div
                            className="cursor-pointer text-bold close"
                            onClick={(e) => {
                                props.toggle();
                            }}
                            >
                                X
                        </div>
                        <div className="containers">
                            {purchaseList && purchaseList.length > 0 ? (
                                <>
                                    {purchaseList.map((itm) => {
                                        return(
                                            <div className="each-itm" key={itm.id}>
                                                <div className="itm-dlts">
                                                    <div className="itm-name">
                                                        {itm.title}
                                                    </div>
                                                    <div className="itm-rs">
                                                        {Pix.dollar(itm.amount, 1)}
                                                    </div>
                                                </div>
                                                <div className="itm-btn">
                                                    <span 
                                                        className="btn sel-btn"
                                                        onClick={ChooseItem}
                                                        data-id={itm.id}
                                                        data-title={itm.title}
                                                        data-amount={itm.amount}
                                                    >
                                                        Select
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="text-center">No purchasable items found!</div>
                            )}
                        </div>
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );   
}

export default OtherPurchasableList;