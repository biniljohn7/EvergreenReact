import styled from 'styled-components'
import {HEADER_COLOR} from "../../helper/constant"

const PaginationWrapper = styled.div`
  .active {
    border-radius: 2px;
  }

  .itemClass {
    padding: 8px;
    font-size: 24px;
    color: black;
    font-weight: bold;
  }

  .iconcolor {
    color: #c02011 !important;
    padding: 8px 14px;
    vertical-align: middle;
  }

  .activelink {
    color: white !important;
    font-weight: bold;
    background: ${HEADER_COLOR};
    // background: #153bf6;
    border-radius: 2px;
    padding: 8px 14px;
    text-decoration: none;
  }

  .linkClass {
    color: black;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }

  .disableddata {
    cursor: not-allowed;
    i {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`

export default PaginationWrapper
