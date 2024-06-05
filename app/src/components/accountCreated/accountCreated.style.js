import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'

const Wrapper = styled.div`
    text-align:center;
    padding:50px 15px;

    .heading {
        color: ${HEADER_COLOR};
        font-size: 1.6em;
        font-weight: 800;
        margin-bottom: .5em;
    }
`

export default Wrapper