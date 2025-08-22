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

    .srh-section {
        padding-bottom: 60px;
    }

    .srh-section .srh-hed {
        font-size: 1.5em;
        margin-bottom: 25px;
    }

    .srh-section .srh-items {
        display: flex;
        gap: 14px;
        position: relative;
        flex-direction: column;
    }

    .srh-section .srh-items .srh-itm {
        position: relative;
        padding: 8px 15px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .srh-section .srh-items .srh-itm:not(:last-child) {
        border-bottom: 1px solid #e1e1e1;
    }

    .srh-section .srh-items .srh-itm .itm-hed {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .srh-section .srh-items .srh-itm .itm-hed .itm-icn .icn {
        font-size: 1.3em;
        padding: 5px;
        border-radius: 50%;
        background-color: #c6c6c6;
        color: #fff;
        transition: background-color 0.3s ease-in-out;
    }

    .srh-section .srh-items .srh-itm .itm-hed:hover .itm-icn .icn {
        background-color: #804195;
    }   

    .srh-section .srh-items .srh-itm .itm-hed .itm-link {
        font-size: .9em;
        text-decoration: underline;
        text-decoration-color: transparent;
        transition: text-decoration-color 0.3s ease-in-out;
    }

    .srh-section .srh-items .srh-itm .itm-hed:hover .itm-link {
        text-decoration-color: #5b2166;
    }

    .srh-section .srh-items .srh-itm .itm-ttl {
        font-size: 1.2em;
        font-weight: 500;
    }

    .srh-section .srh-items .srh-itm .itm-ttl span {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: transparent;
        transition: text-decoration-color 0.3s ease-in-out;
    }

    .srh-section .srh-items .srh-itm .itm-ttl span:hover {
        text-decoration-color: #5b2166;
    }
`

export default CommonWrapper
