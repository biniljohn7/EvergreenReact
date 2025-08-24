import styled from "styled-components";
const Wrapper = styled.div`
    .search-overlay {
        background: #000000;
        pointer-events: none;
        cursor: pointer;
        opacity: 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 49999;
        transition: all .3s ease;
    }

    .search-overlay.visible {
        opacity: .5;
        pointer-events: auto;
    }

    .search-bar {
        width: 700px;
        background: #ffffff;
        box-shadow: 0 3px 10px 2px rgba(0, 0, 0, .04);
        padding: 26px 50px;
        position: fixed;
        top: -110px;
        left: 50%;
        z-index: 50000;
        border-radius: 6px;
        transform: translateX(-50%);
        opacity: 0;
        transition: all .5s ease;
    }

    .search-bar.active {
        top: 140px;
        opacity: 1;
    }

    .search-bar .close {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    .search-bar .srch-bar {
        position: relative;
    }

    .search-bar .srch-bar .key-inp {
        padding-right: 35px;
    }

    .search-bar .srch-bar .srch-btn {
        position: absolute;
        border: none;
        padding: 0px;
        background: transparent;
        top: 6px;
        right: 7px;
    }
`;
export default Wrapper;
