import styled from 'styled-components'

const TextareaWrapper = styled.div`
  .insidelabelmain {
    text-align: left;
    letter-spacing: 0;
    color: #ffffff;
    opacity: 1;
    height: 16px;
  }
  .inputmain {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid rgba(112, 112, 112, 0.4);
    width: 100%;
    color: #261e1e;
    border-radius: 4px;
    opacity: 1;
  }

  .input-switch-main {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid rgba(112, 112, 112, 0.4);
    color: #261e1e;
    border-radius: 4px;
    opacity: 1;
  }

  textarea:disabled {
    background: #e3e3e3;
    cursor: not-allowed;
  }
`

export default TextareaWrapper
