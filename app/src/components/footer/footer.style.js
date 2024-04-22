import styled from 'styled-components'
import { FOOTER_COLOR } from '../../helper/constant'
const HeaderWrapper = styled.div`
  .image-size {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  .all-footer {
    position: relative;
  }

  .footer {
    background: ${FOOTER_COLOR};
    padding-top: 3%;
    padding-bottom: 4%;
  }

  .title {
    line-height: 23.27px;
    letter-spacing: 2px;
    @media (max-width: 767px) {
      letter-spacing: 1px;
    }
  }

  .header-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .rights {
    margin-top: 5%;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    // color: #637381;
  }

  .horizontal-line {
    border: 2px solid #34bebf;
    width: 60px;
    background-color: #34bebf;
    margin-top: 2px;
  }

  .contact-horizontal-line {
    border: 2px solid #ffffff;
    width: 60px;
    background-color: #ffffff;
    margin-top: 2px;
  }
`
export default HeaderWrapper
