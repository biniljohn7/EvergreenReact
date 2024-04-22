import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const buttonWrapper = styled.div`
  .button {
    background-color: ${HEADER_COLOR};
    // background-color: #34bebf;
    color: #ffffff;
    border-radius: 41px;
  }

  button:disabled {
    cursor: not-allowed;
  }
`

export default buttonWrapper
