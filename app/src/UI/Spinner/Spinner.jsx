import React, { useState } from 'react'
import SpnWrapper from './Spinner.Style'

export default function Spinner() {
    const [SpinnerVis, setSpinnerVis] = useState(0);
    return {
        Obj: SpinnerVis ?
            <SpnWrapper className="pix-spinner">
                <div className="spn-bg">
                    <div className="spn-ccl"></div>
                </div>
            </SpnWrapper> :
            <></>,
        Show: function () {
            setSpinnerVis(1);
        },
        Hide: function () {
            setSpinnerVis(0);
        }
    }
}
