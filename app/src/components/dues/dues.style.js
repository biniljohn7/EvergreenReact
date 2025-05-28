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
    right: -50px;
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

  .order-summery {
    position: relative;
    padding-top: 30px;
  }

  .order-summery .order-box {
    border: 1px solid #e7e7e7;
    padding: 40px;
    border-radius: 8px;
  }

  .order-summery .order-box .order-itm {
    display: flex;
    flex-direction: column;
  }

  .order-summery .order-box .order-itm:not(:last-child) {
    margin-bottom: 20px;
  }

  .order-summery .order-box .order-itm:not(:first-child) {
    border-top: 1px solid #e7e7e7;
    padding-top: 20px;
  }

  .order-summery .order-box .order-itm .ordr-membship {
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .order-summery .order-box .order-itm .ordr-sub {
    margin-left: 15px;
  }

  .order-summery .order-box .order-itm .sec-aff {
    display: flex;
    margin-bottom: 15px;
    position: relative;
    flex-wrap: wrap;
  }

  .order-summery .order-box .order-itm .sec-aff .sec {
    padding-right: 20px;
  }

  .order-summery .order-box .order-itm .sec-aff .ord-sa::before {
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
    color: #947f98;
  }

  .order-summery .order-box .order-itm .sec-aff .ord-sa.sec::before {
    content: "Section";
  }

  .order-summery .order-box .order-itm .sec-aff .ord-sa.aff::before {
    content: "Affiliate";
  }

  .order-summery .order-box .order-itm .ord-members {
    display: flex;
    flex-wrap: wrap;
    max-width: none;
    margin: 0px -5px 15px;
  }

  .ord-members .ech-mbr {
    width: calc(20% - 10px);
    margin: 0px 5px 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 5px;
  }

  .ord-members .ech-mbr .info-sec {
    position: relative;
  }

  .ech-mbr .info-sec .person-info {
    display: flex;
    align-items: center;
  }

  .ech-mbr .avatar-sec {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    border-radius: 50%;
    overflow: hidden;
  }

  .ech-mbr .avatar-sec .no-img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ech-mbr .avatar-sec .no-img .icn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    font-size: 22px;
  }

  .ech-mbr .mbr-nam {
    margin-left: 10px;
    font-size: 0.9em;
  }

  .order-summery .order-box .order-itm .ord-gift {
    margin-bottom: 10px;
    font-size: 0.9em;
    color: #947f98;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec {
    position: relative;
    border-top: 1px dashed #e7e7e7;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .sec-lf {
    padding-right: 15px;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .sec-rg {
    flex: 0 1 400px;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .sec-lf .act-btn {
    padding: 2px 15px;
    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8em;
  }

  .order-summery
    .order-box
    .order-itm
    .ord-amnt-sec
    .sec-lf
    .act-btn.edt:hover {
    border-color: #0e6acc;
    color: #0e6acc;
  }

  .order-summery
    .order-box
    .order-itm
    .ord-amnt-sec
    .sec-lf
    .act-btn.dlt:hover {
    border-color: #d60000;
    color: #d60000;
  }

  .order-summery
    .order-box
    .order-itm
    .ord-amnt-sec
    .sec-lf
    .act-btn:first-child {
    margin-right: 10px;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .amnt-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    // margin-left: auto;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .amnt-sec + .amnt-sec {
    padding-top: 10px;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .amnt-sec .sec-label {
    font-size: 0.9em;
    flex: 0 1 200px;
    color: #947f98;
  }

  .order-summery .order-box .order-itm .ord-amnt-sec .amnt-sec .amnt {
    font-size: 1.2em;
    font-weight: 500;
  }

  .order-summery .order-ttl-charge {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 445px;
    margin-left: auto;
  }

  .order-summery .order-ttl-charge .ttl-left {
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  }

  .order-summery .order-ttl-charge .ttl-left .lf-lbl {
    font-size: 0.9em;
  }

  .order-summery .order-ttl-charge .ttl-left .lf-amnt {
    font-size: 1.5em;
    font-weight: 600;
  }

  @media only screen and (max-width: 839px) {
    .form-row {
      flex-direction: column;
    }

    .form-row .form-col {
      width: calc(100% - 0px);
    }

    .form-row .form-col:first-child {
      margin-bottom: 10px;
    }

    .form-row .form-col + .form-col {
      margin-left: 0px;
    }
  }

  @media only screen and (max-width: 425px) {
    .gift-membership #selectedMembers {
      flex-direction: column;
    }

    .gift-membership #selectedMembers .ech-mbr {
      margin: 0px 5px 10px;
      width: auto;
    }
  }
`;
export default Wrapper;
