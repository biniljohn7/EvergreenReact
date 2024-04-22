import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const style = styled.div`
  margin-bottom: 15px;
  .term {
    text-align: left;
    letter-spacing: 0;
    color: #261e1e;
    opacity: 1;
  }

  .custom-checkbox
    .custom-control-input:checked
    ~ .custom-control-label::before {
    background-color: ${HEADER_COLOR};
    // background-color: #153bf6;
  }

  .checkboxLabel {
    letter-spacing: 0;
    color: #030405;
    opacity: 1;
  }

  .checkbox-spacing {
    height: 70px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .mobileview {
    padding-left: 10px;
    @media (max-width: 768px) {
      padding-left: 0px;
      font-size: 14px;
    }
  }

  .custom-control-label::before {
    height: 24px;
    width: 24px;
    top: 0px;
    @media (max-width: 768px) {
      height: 19px;
      width: 19px;
    }
  }

  .custom-control-label::after {
    height: 24px;
    width: 24px;
    top: 0px;
    @media (max-width: 768px) {
      height: 19px;
      width: 19px;
    }
  }
`

export default style
