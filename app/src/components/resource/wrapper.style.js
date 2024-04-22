import styled from 'styled-components'

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
`

export default CommonWrapper
