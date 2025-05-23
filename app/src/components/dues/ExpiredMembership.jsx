import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Spinner from "../../UI/Spinner/Spinner";
import { getExpiredMemberships } from "../../api/duesAPI";

const ExpiredMembership = () => {
    const [expData, setExpData] = useState(null);
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


    return (
        <div className="">
            {Spn.Obj}
            expired membership list
            {console.log(expData)}
        </div>
    );
}

export default ExpiredMembership; 