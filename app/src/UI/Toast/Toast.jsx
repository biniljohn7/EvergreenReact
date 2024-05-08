import React, { useState } from 'react'
import ToastWp from './Toast.style'

export default function Toast() {
    const [ToastMsg, setToastMsg] = useState(null);
    const [ToastClose, setToastClose] = useState(0);

    let tr = {
        Show: function (msg, type) {
            let o = this;
            setToastMsg((type || 0) + ':' + msg);
            setTimeout(function () {
                o.Close();
            }, 4000);
        },
        Close: function () {
            setToastClose(1);
            setTimeout(function () {
                setToastClose(0);
                setToastMsg(null);
            }, 700);
        },
        Error: function (msg) {
            this.Show(msg, 2);
        },
        Success: function (msg) {
            this.Show(msg, 1);
        }
    };

    tr.Obj = ToastMsg ?
        <ToastWp className={
            'pix-toast ' +
            (ToastClose ? 'closing' : '') +
            ' msg-tp-' + ToastMsg[0]
        }>
            {ToastMsg.slice(2)}
            <span className="material-symbols-outlined close-btn" onClick={function () {
                tr.Close();
            }}>
                close
            </span>
        </ToastWp> :
        <></>;

    return tr;
}