import styled from 'styled-components'
import { FOOTER_COLOR } from '../../helper/constant'
const HeaderWrapper = styled.div`
  .image-size {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  .all-footer {
    position: relative;
  }

  .footer {
    background: ${FOOTER_COLOR};
    padding-top: 3%;
    padding-bottom: 4%;
  }

  .title {
    line-height: 23.27px;
    letter-spacing: 2px;
    @media (max-width: 767px) {
      letter-spacing: 1px;
    }
  }

  .header-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .rights {
    margin-top: 5%;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    // color: #637381;
  }

  .horizontal-line {
    border: 2px solid #34bebf;
    width: 60px;
    background-color: #34bebf;
    margin-top: 2px;
  }

  .contact-horizontal-line {
    border: 2px solid #ffffff;
    width: 60px;
    background-color: #ffffff;
    margin-top: 2px;
  }
  .footer-section{
    .container{
      justify-content: normal;
      @media (max-width: 768px) {
            flex-direction:column;
        }
      .l-logo{
        width: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 20px;
        @media (max-width: 1280px) {
            display:block;
        }
        @media (max-width: 991px) {
            width: 65%;
        }
        @media (max-width: 768px) {
            text-align:center;
            width: 100%;
            margin-bottom:20px;
        }
        .f-nav{
          a{
            color:#fff;
          }
        }
      }
      .r-logo {
        width: 50%;
        display: flex;
        align-items: center;
        text-align: right;
        @media (max-width: 991px) {
            width: 35%;
        }
        @media (max-width: 768px) {
            display:block;
            width: 100%;
            text-align:center;
        }
        .f-social {
            width: calc(100% - 0px);
            margin-right: 10px;
            img{
              margin:0 5px;
            }
            @media (max-width: 768px) {
                text-align:center;
                width: 100%;
            }
        }
      }
    }
  }
`
export default HeaderWrapper
