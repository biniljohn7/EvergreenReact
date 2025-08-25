import styled from "styled-components";

const CommonWrapper = styled.div`
        .box {
        width: 100%;
        height: 0;
        padding-bottom: 20%;
        position: relative;
    }

    .grid-container2 {
        display: grid;
        grid-template-columns: ${(props) => props.col};
        column-gap: 15px;
    }

    .grid-item2 {
        width: 100%;
        text-align: center;
        justify-content: center;
        padding-top: ${(props) => props.top};
        padding-bottom: ${(props) => props.top};
    }

    .grid-container1 {
        display: grid;
        grid-template-columns: ${(props) => props.col};
        // grid-template-rows: auto auto;
        row-gap: 15px;
        column-gap: 10px;
    }

    .grid-item1 {
        width: 100%;
        text-align: center;
        justify-content: center;
        padding-top: ${(props) => props.top};
        padding-bottom: ${(props) => props.top};
    }

    .item1 {
        grid-column: 1 / span 2;
    }

    .download {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .card {
        background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
        // background-image: linear-gradient(#34bebf, #153bf6);
    }

    .radius {
        border-radius: 10px;
    }

    .pill {
        position: absolute;
        right: ${(props) => props.padding};
    }

    .padding {
        padding: ${(props) => props.padding};
    }

    .name {
        position: absolute;
        left: ${(props) => props.padding};
        bottom: ${(props) => props.padding};
    }

    .validity {
        position: absolute;
        right: ${(props) => props.padding};
        bottom: ${(props) => props.padding};
    }

    .member {
        position: absolute;
        top: ${(props) => props.member};
    }

    .benefit-wrap {
        padding: 50px 0px;
    }

    .benefit-item {
        position: relative;
        max-width: 750px;
    }
    .benefit-card {
        display: flex;
        flex-direction: column;
        // position: relative;
        // max-width: 750px;
    }

    .benefit-card .card-details {
        margin-bottom: 20px;
        padding-left: 40px;
        color: #000;
    }

    .benefit-card .card-details .dtl-top {
        margin-bottom: 30px;
    }

    .benefit-card .card-details .dtl-top .dtl-itms span:first-child {
        padding-right: 8px;
    }

    .benefit-card .card-details .dtl-btm {
        text-align: center;
    }

    .benefit-dwnld {
        max-width: 750px;
        display: flex;
        padding-top: 70px;
        justify-content: space-around;
        gap: 10px;
    }

    .benefit-dwnld .dwnld-box {
        padding: 10px 22px;
        background-color: #5b2166;
        border-radius: 30px;
        display: flex;
        align-items: center;
        gap: 5px;
        color: #fff;
        cursor: pointer;
    }

    .benefit-dwnld .dwnld-btn {
        font-size: 0.9em;
        color: #fff;
    }

    .vd-wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: none;
        margin: 0px -15px;
    }

    .vd-wrap .vd-list {
        margin: 0 16px 40px;
        width: calc(25% - 32px);
        background-color: #f5f5f5;
        border-radius: 22px;
        border: 1px solid #d9ebec;
        transition: border-color .3s, box-shadow .3s;
    }

    .vd-wrap .vd-list .vd-thumb {
        margin-bottom: 10px;
        text-align: center;
        display: block;
        position: relative;
        cursor: pointer;
    }

    .vd-wrap .vd-list .vd-thumb img {
        width: 100%;
        border-radius: 22px;
    }

    .vd-wrap .vd-list .vd-thumb .no-img {
        background-color: #EBE9E9;
        border-radius: 15px;
        padding-top: 100%;
        position: relative;
        display: block;
    }

    .vd-wrap .vd-list .vd-thumb .no-img .icn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3em;
        color: #C9C9C9;
    }

    .vd-wrap .vd-list .vd-thumb .ply-icn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #dadada;
        font-size: 4em;
        opacity: 0;
        transition: all .5s ease;
    }

    .vd-wrap .vd-list .vd-thumb:hover .ply-icn {
        opacity: 1;
    }

    .vd-wrap .vd-list .vd-title {
        padding: 0px 10px 20px 12px;
    }

    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .video-container {
        position: relative;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        max-width: calc(100% - 30px);
    }

    .video-container iframe {
        max-width: 100%;
    }

    .close-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #fff;
        color: #000;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 1023px) {
        .vd-wrap .vd-list {
            width: calc(33.33% - 32px);
        }
    }

    @media only screen and (max-width: 758px) {
        .vd-wrap .vd-list {
            width: calc(50% - 32px);
        }
    }

    @media only screen and (max-width: 529px) {
        .vd-wrap .vd-list {
            width: calc(100% - 32px);
        }

        .video-container {
            padding: 14px;
        }
    }

    @media only screen and (max-width: 509px) {
        .benefit-card .card-details {
            padding-left: 12px;
            font-size: 0.9em;
        }

        .benefit-dwnld {
            flex-direction: column;
            align-items: center;
        }
    }
`;

export default CommonWrapper;
