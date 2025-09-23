import styled from 'styled-components';
import Bg from '../../assets/images/new-page-resources.png';
import BannerImg from '../../assets/images/banner-bg.png'

const Wrapper = styled.div`
    .prgm-section {
        padding-top: 50px;
        padding-bottom: 0;
    }

    .prgm-section .head-box .container::before,
    .prgm-section .head-box .container::after {
        display: none;
    }

    .prgm-section .head-tab ul {
        gap: 40px;
    }

    .prgm-section .head-tab ul .nav-link {
        cursor: pointer;
    }

    .cat-link-wrap {
        padding: 20px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cat-link-wrap .link-card {
        background-image: url(${BannerImg});
        background-repeat: no-repeat;
        background-size: cover;
        border: 1px solid #5B2166;
        border-radius: 25px;
        padding: 30px 40px;
        margin-bottom: 20px;
        color: #fff;
        font-family: "Poppins", sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        flex-wrap: wrap;
        @media (max-width: 767px) {
            flex-direction: column-reverse;
            text-align: center;
        }
    }

    .cat-link-wrap .link-card .card-lf {
        font-size: 1.5em;
        font-weight: 700;
        word-break: break-word;
        @media (max-width: 767px) {
            font-size: 1.2em;
            font-weight: 600;
        }
    }

    .cat-link-wrap .link-card .card-rg {
        font-size: 2.5em;
        font-weight: 700;
    }

    .cat-btm {
        margin-bottom: 20px;
    }

    .cat-btm .mail-link {
        cursor: pointer;
        color: #4b8df9;
        text-decoration: underline;
    }

    .cat-btm .mail-link:hover {
        color: #004cc8
    }

`
export default Wrapper
