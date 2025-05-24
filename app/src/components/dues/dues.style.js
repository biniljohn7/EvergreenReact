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

  .add-btn .action span {
    font-size: 1.5em;
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
    display: flex;
    flex-wrap: wrap;
    max-width: none;
  }

  .gift-membership #selectedMembers .ech-mbr {
    width: calc(50% - 10px);
    margin: 0px 5px 10px;
  }
  .gift-membership #selectedMembers .ech-mbr .avatar-sec {
    width: 40px;
    height: 40px;
  }

  .gift-membership #selectedMembers .ech-mbr .avatar-sec .no-img .icn {
    font-size: 22px;
  }

  .gift-membership #selectedMembers .ech-mbr .mbr-nam,
  .gift-membership #selectedMembers .ech-mbr .action {
    margin-left: 10px;
    font-size: 0.9em;
  }

  .gift-membership #selectedMembers .ech-mbr .action {
    position: absolute;
    top: -10px;
    right: -25px;
  }

  .gift-membership #selectedMembers .ech-mbr .info-sec {
    position: relative;
  }

  .gift-membership #selectedMembers .ech-mbr .info-sec .person-info {
    margin-bottom: 0px;
  }

  .form-col.sugg {
    position: relative;
  }

  .form-col.sugg .suggestion-box {
    position: absolute;
    width: 100%;
    // height: 300px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    background-color: #f3f3f3;
    top: 70px;
    left: 0px;
    border-radius: 6px;
  }

  .form-col.sugg .suggestion-box .suggestions {
    padding: 6px 10px;
    font-size: 0.9em;
    cursor: pointer;
  }

  .form-col.sugg .suggestion-box .suggestions:not(:last-child) {
    border-bottom: 1px solid #ececec;
  }
`;
export default Wrapper;
