import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const CommonWrapper = styled.div`
  .code {
    color: ${HEADER_COLOR};
    border: 1px dashed #343a40;
    border-radius: 6px;
    width: fit-content;
    margin: 0 auto;
  }

  .share {
    position: absolute;
    bottom: 0;
    color: #ffffff;
  }

  .history {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    padding-left: 0px;
  }

  li {
    margin: 0 auto;
  }

  .user {
    height: 60px;
    width: 60px;
    // object-fit: contain;
    border-radius: 50%;
  }
`

export default CommonWrapper
