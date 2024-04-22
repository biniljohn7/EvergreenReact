import styled from 'styled-components'
import { HEADER_COLOR } from '../helper/constant'

const CommonWrapper = styled.div`
  .flex-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    color: #ffffff;
  }

  .flex-item {
    flex: 50%;
  }

  .header-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .download {
    background-color: #ffffff;
    // background-color: #34bebf;
    border-radius: 41px;
    color: ${HEADER_COLOR};
    // margin-top: -7px;
  }

  .download:hover {
    text-decoration: none;
    color: ${HEADER_COLOR};
  }
`
export default CommonWrapper
