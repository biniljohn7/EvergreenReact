import React, { useState, useEffect } from 'react';
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import { NOTIFICATIONS_OPTIONS } from '../../helper/constant';
import { setNotifications, getNotifications } from '../../api/memberAPI';

const Notification = (props) => {
    let Tst = Toast();
    let Spn = Spinner();

    document.title = 'Notification - ' + window.seoTagLine;

    const [checked, setChecked] = useState({});

    const handleCheckboxChange = async (optKey, checkedVal) => {
        setChecked((prev) => ({
            ...prev,
            [optKey]: checkedVal
        }));

        try {
            Spn.Show();
            let res = await setNotifications({
                option: optKey,
                chkStatus: checkedVal ? 1 : 0
            });
            
            if (res?.success) {
                Tst.Success("Notification preference updated!");
            } else {
                Tst.Error("Failed to update notification.");
            }
        } catch (err) {
            Tst.Error("Something went wrong.");
        } finally {
            Spn.Hide();
        }
    };

    useEffect(() => {
        getNotifications()
            .then((res) => {
                if (res?.data) {
                    let initialChecked = {};
                    res.data.forEach(opt => {
                        initialChecked[opt] = true;
                    });
                    setChecked(initialChecked);
                }
            })
            .catch(() => {
                Tst.Error("Error fetching notification list");
            });
    }, []);

    const Notifications = () => {
        return NOTIFICATIONS_OPTIONS.map((noti, key) => (
            <div className="mb-20 noti" key={key}>
                <label className="fs-16 mb-10 text-bold">{noti.label}:</label>
                <div className='noti-list'>
                    {noti.options.map((opt) => (
                        <label className="chk-label" key={opt.key}>
                            <input
                                type="checkbox"
                                name={opt.key}
                                id={opt.key}
                                checked={!!checked[opt.key]}
                                onChange={(e) =>
                                    handleCheckboxChange(opt.key, e.target.checked)
                                }
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <>
            {Tst.Obj}
            {Spn.Obj}
            <section className={props.isMobile ? 'border plr-15 ptb-30' : ''}>
                <h3 className='text-bold'>Notification</h3>
                <div className={'mt-20 ' + (window.innerWidth < 768 ? 'wp-100' : 'wp-70')}>
                    <Notifications />
                </div>
            </section>
        </>
    );
};

export default Notification;