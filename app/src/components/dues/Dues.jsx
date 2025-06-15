import React, { useState, useEffect } from "react";
import Wrapper from "./dues.style";
import Button from "../../UI/button/button";
import {
    viewMemebership,
    cancelSubscription,
    viewPaymentHistory,
} from "../../api/duesAPI";
import { ToastsStore } from "react-toasts";
import {/*  Modal, */ Spinner } from "reactstrap";
import Pix from "../../helper/Pix";

import Echeck from "../../assets/images/e_check.png";
import Express from "../../assets/images/express.png";
import Discover from "../../assets/images/discover.png";
import Mastercard from "../../assets/images/mastercard.png";
import Visa from "../../assets/images/visa.png";

import GiftMembership from './GiftMembership';
import ExpiredMembership from './ExpiredMembership';
import { store } from "../../redux/store";

const Dues = (props) => {
    const {membershipStatus} = store.getState().auth;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState(null);
    // const [chargesTitle, setChargesTitle] = useState(null);
    // const [isOpen, setOpen] = useState(false);

    /* const list = [
      {
        title: "2019 Membership Dues",
        date: "13-11-2019",
        fees: "$475.00",
      },
      {
        title: "2019 Membership Dues",
        date: "13-11-2019",
        fees: "$475.00",
      },
      {
        title: "2019 Membership Dues",
        date: "13-11-2019",
        fees: "$475.00",
      },
      {
        title: "2019 Membership Dues",
        date: "13-11-2019",
        fees: "$475.00",
      },
      {
        title: "2019 Membership Dues",
        date: "13-11-2019",
        fees: "$475.00",
      },
    ]; */

    useEffect(() => {
        setLoading(true);
        viewMemebership()
            .then((res) => {
                if (res.success === 1) {
                    setData(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                ToastsStore.error("Something went wrong!");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);

        viewPaymentHistory()
            .then((res) => {
                if (res.success === 1) {
                    setHistoryData(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                ToastsStore.error("Something went wrong!");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    document.title = 'Dues - ' + window.seoTagLine;

    return loading ? (
        <div className="custom-spinner">
            <Spinner color="danger" />
        </div>
    ) : (
        <Wrapper>
            <div className="due-section">
                <div className="head-box">
                    <div className="container">
                        <h2>dues</h2>
                    </div>
                </div>
                <div className="due-box">
                    <div className="container">
                        <div className="due-left">
                            <div className="due-item">
                                <div className="due-head">MEMBERSHIP FEE DETAILS</div>
                                <div className="due-content">
                                    {function () {
                                        if (data) {
                                            return (
                                                <table cellPadding={7} style={{ width: '100%' }}>
                                                    <tbody>
                                                        {data.map((group, groupIndex) => {
                                                            const validItems = group?.filter(item => item && item.label) || [];
                                        
                                                            return validItems.map((item, itemIndex) => (
                                                                <tr
                                                                    key={`${groupIndex}-${itemIndex}`}
                                                                    style={
                                                                        groupIndex > 0 && itemIndex === 0
                                                                            ? { borderTop: '1px solid #ccc' }
                                                                            : {}
                                                                    }
                                                                >
                                                                    <td className="bold-600">{item.label}</td>
                                                                    <td className="text-right">{item.amount}</td>
                                                                </tr>
                                                            ));
                                                        })}
                                                    </tbody>
                                                </table>
                                            );
                                        }
                                    }()}
                                    <ExpiredMembership />
                                </div>
                            </div>

                            <div className="text-center">
                                <img src={Visa} alt="Visa" className="card-icon mr-3" />

                                <img src={Mastercard} alt="Mastercard" className="card-icon mr-3" />

                                <img
                                    src={Express}
                                    alt="American Express"
                                    className="card-icon mr-3"
                                />

                                <img src={Discover} alt="Discover" className="card-icon mr-3" />

                                <img src={Echeck} alt="eCheck" className="card-icon" />
                            </div>

                            <div className="input-btn">
                                <button className="btn"
                                    onClick={() => {
                                        props.history.push("/dues/membership");
                                    }}
                                >
                                    {membershipStatus=='active'?'GIFT':'CHOOSE'} MEMBERSHIP
                                </button>
                            </div>

                            {
                                data &&
                                    data.isRecurring ?
                                    <div className="text-center mt-15">
                                        <Button
                                            className="button ptb-15"
                                            name="CANCEL SUBSCRIPTION"
                                            clicked={() => {
                                                cancelSubscription(data.membershipId && data.membershipId)
                                                    .then((res) => {
                                                        if (res.success === 1) {
                                                            ToastsStore.success(res.message);
                                                        } else {
                                                            ToastsStore.error(res.message);
                                                        }
                                                    })
                                                    .catch((err) => {
                                                        console.error(err);
                                                        ToastsStore.error("Something went wrong!");
                                                    })
                                                    .finally(() => {
                                                        setLoading(false);
                                                    });
                                            }}
                                        />
                                    </div> :
                                    null
                            }



                        </div>
                        <div className="due-right">
                            <div className="due-item">
                                <div className="due-head">PAYMENT HISTORY </div>
                                <div className="due-content">
                                    {function () {
                                        if (
                                            historyData &&
                                            historyData
                                        ) {
                                            return historyData.map(function (el, index) {
                                                return <div className="mb15" key={index}>
                                                    <div className="bold-600 text-12">
                                                        {el.chargesTitle}
                                                    </div>
                                                    <div>
                                                        {new Date(el.paidAt).toLocaleDateString("en-US")}
                                                    </div>
                                                    {Pix.dollar(el.totalAmount, 1)}
                                                </div>;
                                            });
                                        } else {
                                            return <div className="text-center">
                                                YOU HAVE NO MEMBERSHIP
                                            </div>
                                        }
                                    }()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <GiftMembership />
                </div>
            </div>

        </Wrapper>
    );
};

export default Dues;
