import styled from "styled-components";
import BannerImg from '../../assets/images/banner-bg.png'

const Warpper = styled.div`
  .nav-tabs .nav-link {
    color: #637381;
    border-color: #fff #fff #dee2e6 #fff;
    padding: 0.5rem 1rem 0.5rem 0;
  }

  .nav-tabs .nav-link.active {
    font-weight: bold;
  }

  .nav-link:hover {
    cursor: pointer;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(
      ${(props) => props.col || 3},
      ${(props) => props.width || "33%"}
    );
    column-gap: 10px;
    row-gap: 10px;
    @media (max-width: 767px) {
      column-gap: 7px;
    }
  }

  .grid-item {
    // border: 1px solid #f5f6f6;
    width: 100%;
  }

  .box {
    // background-image: linear-gradient(#34bebf, #153bf6);
    width: 100%;
    height: ${(props) => props.size || "158px"};
  }

  .image-size {
    width: 100%;
    height: ${(props) => props.size || "158px"};
    object-fit: contain;
  }

  .date {
    position: absolute;
    right: 10px;
    bottom: -25px;
    height: 60px;
    width: 60px;
    color: #ffffff;
    background-color: #302f2f;
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    @media (max-width: 767px) {
      height: 50px;
      width: 50px;
      font-size: 12px !important;
      padding: 5px 10px 5px 10px;
    }
  }

  .news-date {
    position: absolute;
    top: 0;
    right: 10px;
  }

  .discount {
    // background-image: linear-gradient(#34bebf, #153bf6);
    background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* new landing page banner  */
  .new-banner {
      background-image: url(${BannerImg});
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: space-between;
      margin-top: -26px;
      @media (max-width: 767px) {
        display: block;
        text-align: center;
      }
  }
  .cnt-sec {
    margin-left: 100px;
    @media (max-width: 991px) {
      margin-left: 30px;
    }
    @media (max-width: 767px) {
      margin-left: 0px;
      text-align: center;
    }
  }
  .cnt-sec .welcom {
    font-size: 90px;
    font-weight: 400;
    font-family: "Open Sans", serif;
    line-height: 100px;
    margin-bottom: 13px;
    @media (max-width: 1450px) {
      font-size: 50px;
       line-height: 60px;
    }
    @media (max-width: 991px) {
       font-size: 35px;
       line-height: 45px;
    }
    @media (max-width: 767px) {
        padding-top: 20px;
        font-size: 60px;
        line-height: 75px;
    }
    @media (max-width: 550px) {
      font-size: 36px;
      line-height: 47px;
    }
  }
  .cnt-sec .mbr-nam {
    font-family: "Open Sans", serif;
    font-size: 90px;
    font-weight: 700;
    line-height: 100px;
    margin-bottom: 35px;
    @media (max-width: 1450px) {
      font-size: 50px;
       line-height: 60px;
    }
    @media (max-width: 991px) {
       font-size: 35px;
       line-height: 45px;
    }
    @media (max-width: 767px) {
        font-size: 60px;
        line-height: 75px;
    }
    @media (max-width: 550px) {
      font-size: 36px;
      line-height: 47px;
    }
  }
  .cnt-sec .msg {
    font-family: "Poppins", sans-serif;
    font-size: 36px;
    font-weight: 400;
    letter-spacing: 1px;
    @media (max-width: 1450px) {
      font-size: 26px;
    }
    @media (max-width: 991px) {
       font-size: 25px;
    }
    @media (max-width: 767px) {
      font-size: 30px;
    }
    @media (max-width: 550px) {
      font-size: 25px;
    }
  }
  
  .img-sec {
    @media (max-width: 1450px) {
      width: 45%;
      margin: 0 auto;
    }
    @media (max-width: 991px) {
      width: 50%;
      margin: 0 auto;
    }
  }

  .what-do {
    padding: 60px 0px;
    position: relative;
  }
  .what-do::after{
    position: absolute;
    content: "";
    width: 80%;
    background: #A47200;
    height: 1px;
    top: 110px;
    z-index: -2;
    right: 0;
    @media (max-width: 991px) {
      top: 96px;
    }
    @media (max-width: 650px) {
      top: 83px;
    }
    @media (max-width: 420px) {
      top: 77px;
    }
  }
  .what-do .do-head {
    font-family: "Open Sans", serif;
    font-size: 64px;
    font-weight: 400;
    color: #5B2166;    
    background-color: #fff;
    display: inline-block;
    padding-right: 30px;
    @media (max-width: 991px) {
      font-size: 45px;
    }
    @media (max-width: 650px) {
      font-size: 30px;
    }
    @media (max-width: 420px) {
      font-size: 22px;
    }
  }

 
`;

export default Warpper;
