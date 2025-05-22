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
    padding-top: 20px;
    margin-bottom: 20px;
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

  .popup-title {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 1.2em;
    font-weight: 600;
  }

  .psw-view {
    position: absolute;
    font-size: 1.3em;
    top: 36px;
    right: 8px;
    cursor: pointer;
  }

  .member .insidelabelmain {
    color: #000;
  }

  .gift-membership #selectedMembers {
    margin-bottom: 0px;
    padding-top: 20px;
  }

  .gift-membership #selectedMembers .ech-mbr .info-sec {
    position: relative;
  }

  .gift-membership #selectedMembers .ech-mbr .info-sec .person-info {
    margin-bottom: 0px;
  }

  .gift-membership #selectedMembers .ech-mbr .action {
    position: absolute;
    top: 3px;
    right: -40px;
  }
`;
export default Wrapper;
