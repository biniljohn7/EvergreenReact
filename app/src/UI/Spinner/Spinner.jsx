import React, { useEffect, useState } from 'react'

export default function Spinner() {
    const [SpinnerVis, setSpinnerVis] = useState(0);
    // useEffect
    return {
        Obj: SpinnerVis ?
            <div class="">
                xxxx
            </div> :
            <></>,
        Show: function () {
            setSpinnerVis(1);
        }
    }
}
