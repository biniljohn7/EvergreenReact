import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const SigninWrapper = styled.div`
  .cancelmain {
    width: 20px;
    height: 20px;
    // float: right;
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .short-desc {
    letter-spacing: 1px;
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

  .login {
    background-color: ${HEADER_COLOR};
  }

  row {
    margin-right: 0px;
    margin-left: 0px;
  }

  .pwd {
    position: absolute;
    right: 15px;
    top: 56%;
  }

  a {
    color: red;
  }
`

export default SigninWrapper
