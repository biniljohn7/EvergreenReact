import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const style = styled.div`
  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    background-color: ${HEADER_COLOR};
  }

  .custom-control-label::before {
    height: 20px;
    width: 20px;
    top: 0rem;
    @media (max-width: 768px) {
      height: 15px;
      width: 15px;
      top: 3px;
    }
  }

  .custom-control-label::after {
    height: 20px;
    width: 20px;
    top: 0rem;
    @media (max-width: 768px) {
      height: 15px;
      width: 15px;
      top: 3px;
    }
  }
`

export default style
