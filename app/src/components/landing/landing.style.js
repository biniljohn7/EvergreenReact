import styled from 'styled-components'
import { FOOTER_COLOR, HEADER_COLOR } from '../../helper/constant'

const LandingWrapper = styled.div`
  .landing {
    disply: flex;
    align-items: center;
  }

  .button {
    background-color: ${HEADER_COLOR};
    // background-color: #34bebf;
    color: #ffffff;
    border-radius: 41px;
  }

  .home-footer {
    background: ${FOOTER_COLOR};
    padding-top: 60px;
    padding-bottom: 60px;
  }

  .para {
    color: #637381;
    font-size: 16px;
    line-height: 27px;
    text-align: justify;
  }

  .landing-image {
    display: block;
    object-fit: contain;
    @media (min-width: 768px) {
      margin-left: auto;
    }
    @media (max-width: 767px) {
      margin: auto;
      margin-bottom: 35px;
    }
  }

  .sceenshot-image {
    display: block;
    height: auto;
    object-fit: contain;
    position: absolute;
    @media (min-width: 768px) {
      top: 10%;
      left: 10%;
      width: 80%;
    }
  }

  .mobile-screen {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-bottom: -120px;
    @media (max-width: 375px) {
      margin-bottom: -120px;
    }
    @media (max-width: 425px) {
      margin-bottom: -120px;
    }
  }

  row {
    margin-left: 0;
    margin-right: 0;
  }

  .horizontal-line {
    border: 2px solid ${HEADER_COLOR};
    // border: 2px solid #34bebf;
    width: 60px;
    background-color: ${HEADER_COLOR};
    // background-color: #34bebf;
    margin-top: 2px;
  }

  .sub-text {
    color: #f5f6f6;
  }

  #mapBoxCont div:first-child {
    position: relative !important;
    height: 300px !important;
  }
`
export default LandingWrapper
