import styled from "styled-components";

const CommonWrapper = styled.div`
  .box {
    width: 100%;
    height: 0;
    padding-bottom: 20%;
    position: relative;
  }

  .grid-container2 {
    display: grid;
    grid-template-columns: ${(props) => props.col};
    column-gap: 15px;
  }

  .grid-item2 {
    width: 100%;
    text-align: center;
    justify-content: center;
    padding-top: ${(props) => props.top};
    padding-bottom: ${(props) => props.top};
  }

  .grid-container1 {
    display: grid;
    grid-template-columns: ${(props) => props.col};
    // grid-template-rows: auto auto;
    row-gap: 15px;
    column-gap: 10px;
  }

  .grid-item1 {
    width: 100%;
    text-align: center;
    justify-content: center;
    padding-top: ${(props) => props.top};
    padding-bottom: ${(props) => props.top};
  }

  .item1 {
    grid-column: 1 / span 2;
  }

  .download {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .card {
    background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    // background-image: linear-gradient(#34bebf, #153bf6);
  }

  .radius {
    border-radius: 10px;
  }

  .pill {
    position: absolute;
    right: ${(props) => props.padding};
  }

  .padding {
    padding: ${(props) => props.padding};
  }

  .name {
    position: absolute;
    left: ${(props) => props.padding};
    bottom: ${(props) => props.padding};
  }

  .validity {
    position: absolute;
    right: ${(props) => props.padding};
    bottom: ${(props) => props.padding};
  }

  .member {
    position: absolute;
    top: ${(props) => props.member};
  }

  .benefit-wrap {
    padding: 50px 0px;
  }

  .benefit-item {
    position: relative;
    max-width: 750px;
  }
  .benefit-card {
    display: flex;
    flex-direction: column;
    // position: relative;
    // max-width: 750px;
  }

  .benefit-card .card-details {
    margin-bottom: 20px;
    padding-left: 40px;
    color: #000;
  }

  .benefit-card .card-details .dtl-top {
    margin-bottom: 30px;
  }

  .benefit-card .card-details .dtl-top .dtl-itms span:first-child {
    padding-right: 8px;
  }

  .benefit-card .card-details .dtl-btm {
    text-align: center;
  }

  .benefit-dwnld {
    max-width: 750px;
    display: flex;
    padding-top: 70px;
    justify-content: space-around;
    gap: 10px;
  }

  .benefit-dwnld .dwnld-box {
    padding: 10px 22px;
    background-color: #5b2166;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    cursor: pointer;
  }

  .benefit-dwnld .dwnld-btn {
    font-size: 0.9em;
    color: #fff;
  }

  @media only screen and (max-width: 509px) {
    .benefit-card .card-details {
      padding-left: 12px;
      font-size: 0.9em;
    }

    .benefit-dwnld {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default CommonWrapper;
