import styled from "styled-components";

const BackdropWrapper = styled.div`
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.87);
  }
`;

export default BackdropWrapper;
