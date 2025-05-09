import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const SigninWrapper = styled.div`
  .sgp-container {
    width:1020px;
    max-width:100%;
    padding:60px 15px;
    box-sizing:border-box;
    margin:0 auto;
  }
  .ttl-1 {
    text-align: center;
    color: #5b2166;
    font-size: 20px;
  }

  .ttl-2 {
    text-align: center;
    color: #5b2166;
    font-size: 48px;
    font-weight: 700;
    padding-top: 16px;
    margin-bottom: 40px;

    @media screen and (max-width:767px){
      font-size: 30px;
    }
  }
  .form-area {
    display: flex;

    @media screen and (max-width:767px){
      display:block;
    }
  }

  .form-area .form-col {
    width: calc(50% - 20px);
    @media screen and (max-width:767px){
      width:auto;
    }
  }

  .form-area .form-col + .form-col {
    margin-left: 20px;
    @media screen and (max-width:767px){
      margin-left:0;
      margin-top:20px;
    }
  }

  .form-area .form-col .fm-row + .fm-row {
    margin-top:20px;
  }

  .form-area .form-col .fm-row .insidelabelmain {
    color: #5b2166;
    font-size: 24px;
    margin-bottom: 8px !important;
    display: block;
    height: auto;
  }

  .form-area .form-col .inputmain {
    border-color: #5b2166;
    border-radius: 32px;
    color: rgba(91, 33, 102, 1);
    padding: 16px 26px !important;
    font-size: 16px;
  }

  .form-area .form-col .inputmain::placeholder {
    color: #5b2166;
  }

  .sgp-agree {
    text-align: center;
    font-size: 20px;
    padding: 40px 0;
  }

  a {
    color: #5b2166;
    font-weight:500;
  }
  a:hover {
    text-decoration:underline;
  }
  .submit-area {
    text-align: center;
  }
  .submit-area button {
    width: 211px;
    max-width: 100%;
    padding: 12px !important;
  }
`

export default SigninWrapper
