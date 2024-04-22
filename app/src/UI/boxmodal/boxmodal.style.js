import styled from 'styled-components'
// import { THEME_PRIMARY_BG_COLOR, THEME_FONT_COLOR } from '../../../../gunsbid_config';
import { HEADER_COLOR } from '../../helper/constant'

const ModalWrapper = styled.div`
  .labelmain {
    width: 100% !important;
    height: 100% !important;
    background: ${HEADER_COLOR} 0% 0% no-repeat padding-box;
    border-radius: 5px 5px 5px 0px;
    opacity: 1;
    text-align: left;
    font-weight: bold;
    letter-spacing: 0;
    color: ${HEADER_COLOR};
    opacity: 1;
  }
  .boxmain {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #bebebe;
    border-radius: 5px 5px 5px 0px;
    opacity: 1;
    height: 100%;
  }
`

export default ModalWrapper
