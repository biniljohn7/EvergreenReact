import styled from "styled-components";
import BannerImg from '../../assets/images/banner-bg.png'
import Bg from '../../assets/images/new-page-resources.png'


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
      margin-top: -26px;
  }

  .new-banner .cnt-wrap {
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: space-between;
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

  .explore-resources{
    text-align: center;
    color: #fff;
    font-size: 96px;
    line-height: 96px;
    padding: 60px 0;
    font-family: "Open Sans", serif;
    @media only screen and (max-width:991px) {
        font-size: 60px;
        line-height: 70px;
    }
    @media only screen and (max-width:480px) {
        font-size: 30px;
        line-height: 40px;
    }
    .explore-resources-btn a{
      color:#A47200;
      font-size:16px;
      font-family: "Poppins", serif;
      background-color: #fff;
      padding:12px 30px;
      line-height: 20px;
      border-radius: 25px;
      text-transform: uppercase;
      @media only screen and (max-width:480px) {
          padding:10px 20px;
          font-size:14px;

      }
    }
  }
  .head-box::before{
    background-color:#A47200;
  }
  .event-box{
    .container{
      display:block;
    }
    .event-content-box{
      border:1px solid #A47200;
      display:flex;
      flex-direction:row;
      width:100%;
      overflow:hidden;
      border-radius:45px;
      align-items: center;
      margin-bottom:20px;
      @media only screen and (max-width:600px) {
        flex-direction:column-reverse;
      }
      
      .event-contents{
        width:calc(100% - 260px);
        padding:40px;
        @media only screen and (max-width:600px) {
          width:100%;
        }
        .event-date{
          font-family: "Open Sans", serif;
          font-size:24px;
        }
        .event-head h2{
          font-size:30px;
          font-weight:700;
          text-transform: uppercase;
          margin-bottom:5px;
        }
        .button-box{
          margin-top:15px;
          @media only screen and (max-width:600px) {
              margin-top:15px;
          }
          a{
            padding: 8px 35px;            
          }
        }
      }
      .event-image{
        width:260px;
        border-radius:45px;
        overflow:hidden;
        @media only screen and (max-width:480px) {
          width:100%;
        }
        img{
          width:100%;
        }
      }
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
    margin-bottom: 50px;
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

  .what-do .three-cl-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .what-do .three-cl-row .col-3 {
    background-image: url(${Bg});
    width: 30%;
    text-align: center;
    border: 1px solid #5B2166;
    border-radius: 25px;
    padding: 30px;   
    @media (max-width: 767px) {
      width: calc(50% - 30px);
      margin: 15px;
    } 
    @media (max-width: 500px) {
      width: calc(100% - 30px);
    }
  }

  .what-do .three-cl-row .col-3 img {
    margin-bottom: 10px;
  }
  .what-do .three-cl-row .col-3 .lnk-three {
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 700;
    @media (max-width: 1260px) {
      font-size: 25px;
    }
    @media (max-width: 991px) {
      font-size: 21px;
    }
    @media (max-width: 767px) {
      font-size: 25px;
    }
  }

  .ful-row-sec {
    padding: 20px 0px;
  }
  .ful-row-sec .ech-itm {
    background-image: url(${BannerImg});
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #5B2166;
    border-radius: 25px;
    padding: 20px 40px;
    margin-bottom: 20px;
  }

  .ful-row-sec .ech-itm .lnk-itm {
    color: #fff;
    font-family: "Poppins", sans-serif;
  }
  .ful-row-sec .ech-itm .lnk-itm .content-part {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 650px) {
      display: block;
      text-align: center;
    }
  }
  .ful-row-sec .ech-itm .lnk-itm .content-part .main-h {
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .ful-row-sec .ech-itm .lnk-itm .content-part .sub-h {
    font-size: 16px;
    font-weight: 400;
    @media (max-width: 650px) {
      margin-bottom: 15px;
    }
  }
  .ful-row-sec .ech-itm .lnk-itm .content-part .icn {
    font-size: 2.8em;
  }
 .news-box{
    background-image: url(${BannerImg});
    background-repeat: no-repeat;
    background-size: cover;
    .container{
      display:flex;
      gap:60px;
      @media (max-width: 1280px) {
            gap:30px;
      }
      .text-center{
        color:#fff;
        width:100%;
      }
      .news-content{
          width:calc(100% - 53%);
          color:#fff;
          @media (max-width: 1280px) {
            width:calc(100% - 52%);
          }
          @media (max-width: 780px) {
            width:calc(100% - 55%);
          }
          @media (max-width: 600px) {
            width:100%;
          }
          .image-box{
            height:340px;
            overflow:hidden;
            margin-bottom:15px;
            img{
              width:100%;
            }
          }
          h2{
            color:#fff;
            font-size:30px;
            text-transform:uppercase;
            font-weight:700;
            line-height:35px;
            @media (max-width: 600px) {
              font-size:24px;
              line-height:28px
            }
          }
          .button-box{
            margin-top:25px;
            span{
              background: #FFFFFF;
              color: #A47200;
              padding: 10px 25px;
              min-width: 190px;
            }
          }
        }
    }
  .text-center{
    text-align:center;
  }
  .home-tab .nav-tabs .nav-link{
    color:#A47200 !important;
  }
 }
  .gallery-one,.gallery-two{
    padding: 0px 0px 60px;
    @media (max-width: 1024px) {
      padding: 0px 15px 20px;
    }
    .gallery-box{
      display:flex;
      flex-wrap:nowrap;
      gap:30px;
      flex-direction:row;
      justify-content:center;
      @media (max-width: 1024px) {
        flex-wrap:nowrap;
        gap:10px;
      }
      @media (max-width: 600px) {
        flex-wrap:wrap;
        flex-direction:coloumn;
        .image-box{
          margin-bottom:20px;
        }
      }
    } 
  }
  .gallery-two{
    padding: 80px 0 0;
  }
  .gallery-three{
    padding: 0px 0px 60px;
    .gallery-box{
      display:flex;
      flex-wrap:wrap;
      align-items: stretch;
      justify-content: space-between;
      @media (max-width: 600px) {
        flex-direction: column;
      }
      .image-box{
        display: flex;
        margin: 20px 0;
        &:nth-child(even){
          justify-content: flex-end; 
        }
        @media (max-width: 1024px) {
          margin: 10px 0;
          padding:10px;
        }
        img{
          width:100%;
        }
      }
      .image-box.box-odd{
        width:calc(50% - 15px);
        @media (max-width: 1024px) {
          width:100%;
        }
      }

      .image-box.box-even{
        width:calc(48% - 15px);
        
        @media (max-width: 1024px) {
          width:100%;
        }
      }
    }
  }
`;

export default Warpper;
