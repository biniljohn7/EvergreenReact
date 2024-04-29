import styled from "styled-components";
import { HEADER_COLOR } from '../../helper/constant'

const style = styled.div`
    background-color: rgb(255 255 255 / 72%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display:flex;
    align-items:center;
    justify-content:center;

    .spn-bg {
        display: flex;
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
        background-color: rgba(115,115,115,.8);
        border-radius: 50%;
    }

    .spn-ccl {
        border: 5px solid #fff;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        border-radius: 50%;
        border-bottom-color: rgba(0,0,0,0);
        animation: spinnerAnimation .7s infinite;
        -webkit-animation: spinnerAnimation .7s infinite;
    }

    @keyframes spinnerAnimation {
        0% {
            transform: rotate(-360deg)
        }
    }
    
    @-webkit-keyframes spinnerAnimation {
        0% {
            transform: rotate(-360deg)
        }
    }
`

export default style