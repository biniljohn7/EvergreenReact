import styled from "styled-components";
const Wrapper = styled.div`
  .flex-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }

  .flex-item {
    flex: 50%;
  }

  .card-icon {
    width: 70px;
    height: auto;
    object-fit: contain;
  }

  .card-container {
    margin-left: -12px;
  }

  .add-btn {
    padding-top: 20px;
  }

  .add-btn span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .add-btn span .icn {
    font-size: 1.3em;
  }

  .radion-ops {
    display: flex;
    gap: 10px;
  }

  .radion-ops .rd-ops {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
export default Wrapper;
