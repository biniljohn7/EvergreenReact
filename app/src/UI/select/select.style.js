import styled from "styled-components";

const SelectWrapper = styled.div`
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
    border-radius: 4px;
    opacity: 1;
  }

  input:disabled {
    background: #e3e3e3;
    cursor: not-allowed;
  }

  .input-switch-main {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid rgba(112, 112, 112, 0.4);
    border-radius: 4px;
    opacity: 1;
  }
`;

export default SelectWrapper;
