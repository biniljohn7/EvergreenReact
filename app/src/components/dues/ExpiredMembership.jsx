import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Checkbox from "../../UI/checkbox/checkbox";
import Spinner from "../../UI/Spinner/Spinner";
import { getExpiredMemberships } from "../../api/duesAPI";

const ExpiredMembership = () => {
    const [expData, setExpData] = useState(null);
    const [selectedMships, setSelectedMships] = useState([]);
    let Spn = Spinner();

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

    const handleMshipChange = (mid) => {
        setSelectedMships((prev) =>
            prev.includes(mid)
                ? prev.filter((item) => item !== mid) // uncheck
                : [...prev, mid] // check
        );
    };

    return (
        <div className="renew">
            {Spn.Obj}

            {
                expData && expData.list && expData.list.length > 0 ? (
                    <>
                        {expData.list.map((ms) => {
                            return (
                                <div className="each-mbrshp">
                                    <div className="chk-sec">
                                        <Checkbox
                                            id={`mshp${ms.id}`}
                                            name="mshp[]"
                                            checked={selectedMships.includes(ms.id)}
                                            onChange={() => handleMshipChange(ms.id)}
                                            label=""
                                        />
                                    </div>
                                    <div className="pln-nam">
                                        {ms.planInfo.title}
                                    </div>
                                    <div className="pln-amt">
                                        ${ms.planInfo.ttlCharge}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="">
                            <button className="btn btn-rounded button plr-20 ptb-10"
                                onClick={() => {

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

        </div>
    );
}

export default ExpiredMembership; 