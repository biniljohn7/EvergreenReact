import styled from 'styled-components'

const ForgotPasswordWrapper = styled.div`
  .cancelmain {
    width: 20px;
    height: 20px;
    // float: right;
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }

  .flex-item {
    flex: 50%;
  }

  .forgotpwdmain {
    border-radius: 5px;
  }
  .textmain {
    text-align: left;
    letter-spacing: 0;
    color: #030405;
    opacity: 1;
  }

  // row {
  //   margin-right: 0px;
  //   margin-left: 0px;
  // }

  .pwd {
    position: absolute;
    right: 15px;
    top: 56%;
  }

  .container-padding {
    @media (max-width: 767px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`

export default ForgotPasswordWrapper
