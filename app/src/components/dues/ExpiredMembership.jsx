import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import Checkbox from "../../UI/checkbox/checkbox";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";
import { getExpiredMemberships, renewExpiredMembership } from "../../api/duesAPI";

const ExpiredMembership = () => {
    const [expData, setExpData] = useState(null);
    const [selectedMships, setSelectedMships] = useState([]);
    const [isSmryOpen, setSmryOpen] = useState(false);
    let Spn = Spinner();
    let Tst = Toast();

    useEffect(() => {
        Spn.Show();
        getExpiredMemberships()
            .then((res) => {
                if (res.success === 1) {
                    setExpData(res.data);
                } else { }
                Spn.Hide();
            })
            .catch((err) => { });

    }, []);

    const handleMshipChange = (id, label, amount) => {
        setSelectedMships((prev) => {
            const exists = prev.find((item) => item.id === id);

            if (exists) {
                // Remove item if already selected
                return prev.filter((item) => item.id !== id);
            } else {
                // Add item
                return [...prev, { id, label, amount }];
            }
        });
    };

    const handleRenew = () => {
        if (selectedMships.length) {
            setSmryOpen(true);
        } else {
            Tst.Error('Please choose membership(s) to renew');
        }
    };

    const handleRenewMship = () => {
        console.log(selectedMships);

        Spn.Show();
        renewExpiredMembership(
            selectedMships
        )
        .then((res) => {
          if (res.success === 1) {
            if (res.data && res.data.paymentUrl) {
              window.location.href = res.data.paymentUrl;
            } else {
              Tst.Error("Something went wrong!");
            }
          } else {
            Tst.Error(res.message);
          }
        })
        .catch((err) => {
          Tst.Error("Something went wrong!");
        })
        .finally(() => {
          Spn.Hide();
        });
    }

    let insTxt = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th' };
    let ttl = 0;

    return (
        <div className="renew">
            {Spn.Obj}
            {Tst.Obj}


            {
                expData && expData.list && expData.list.length > 0 ? (
                    <>
                        {expData.list.map((ms) => {
                            let ins = 0, insPhse = 0, amt = 0;

                            if (ms.installment) {
                                ins = ms.installment;
                                if (ms.instllmntPhase) {
                                    insPhse = ms.instllmntPhase < 4 ? (parseInt(ms.instllmntPhase, 10) + 1) : 1;
                                }
                                amt = parseFloat(ms.planInfo.ttlCharge / ins);
                            }

                            let plnTitle = ms.planInfo.title + ' ' + (insPhse ? insTxt[insPhse] + ' instalment' : ''),
                                plnAmt = amt ? amt.toFixed(2) : parseFloat(ms.planInfo.ttlCharge).toFixed(2);

                            return (
                                <div className="each-mbrshp">
                                    <div className="chk-sec">

                                        <Checkbox
                                            id={`mshp${ms.id}`}
                                            name="mshp[]"
                                            checked={selectedMships.some((item) => item.id === ms.id)}
                                            onChange={() => handleMshipChange(ms.id, plnTitle, plnAmt)}
                                            label=""
                                        />
                                    </div>
                                    <div className="pln-nam">
                                        {plnTitle}
                                    </div>
                                    <div className="pln-amt">
                                        ${plnAmt}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="">
                            <button className="btn btn-rounded button plr-20 ptb-10"
                                onClick={() => {
                                    handleRenew()
                                }}
                            >
                                RENEW
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        YOU HAVE NO MEMBERSHIP
                    </div>
                )
            }

            {
                isSmryOpen && (
                    <Modal
                        isOpen={isSmryOpen}
                        toggle={() => {
                            setSmryOpen(!isSmryOpen)
                        }}
                        centered
                        size="md"
                        className="renew-mdl"
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
                                <div className="container-sec">
                                    {
                                        selectedMships.length > 0 ? (
                                            <>
                                                <div className="summary">
                                                    Summary
                                                </div>
                                                {selectedMships.map((lst) => {
                                                    ttl += parseFloat(lst.amount);
                                                    return (
                                                        <div className="each-mbrshp">
                                                            <div className="pln-nam">
                                                                {lst.label}
                                                            </div>
                                                            <div className="pln-amt">
                                                                ${lst.amount}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div className="ttl">
                                                    <div className="ttl-lbl">Total</div>
                                                    <div className="ttl-amt">${ttl.toFixed(2)}</div>
                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-rounded button plr-20 ptb-10"
                                                        onClick={() => {
                                                            handleRenewMship()
                                                        }}
                                                    >
                                                        RENEW
                                                    </button>
                                                </div>
                                            </>
                                        ) : ('')
                                    }
                                </div>
                            </div>
                        </Wrapper>
                    </Modal>
                )
            }
        </div>
    );
}

export default ExpiredMembership; 