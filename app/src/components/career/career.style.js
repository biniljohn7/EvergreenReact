import styled from 'styled-components'
const Wrapper = styled.div`
  .pwd {
    position: absolute;
    right: 15px;
    top: 30%;
  }

  .search {
    border: 1px solid #c4cdd5;
    border-radius: 20px;
  }

  .search:focus {
    outline: none;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(
      ${(props) => props.col || 3},
      ${(props) => props.width || '33%'}
    );
    column-gap: 10px;
    row-gap: 10px;
    @media (max-width: 767px) {
      column-gap: 7px;
    }
  }

  .grid-item {
    // border: 1px solid #f5f6f6;
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .date {
    position: absolute;
    right: 10px;
    bottom: -25px;
    height: 60px;
    width: 60px;
    color: #ffffff;
    background-color: #34bebf;
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    @media (max-width: 767px) {
      height: 50px;
      width: 50px;
      font-size: 12px;
      padding: 5px 10px 5px 10px;
    }
  }

  .box {
    // background-image: linear-gradient(#34bebf, #153bf6);
    width: 100%;
    height: ${(props) => props.size || '158px'};
  }

  .image-size {
    width: 100%;
    height: ${(props) => props.size || '158px'};
    object-fit: fill;
  }

  .full-image {
    width: 100%;
    /*height: 350px;*/
    object-fit: contain;
    @media (max-width: 1440px) {
      /*height: 300px !important;*/
    }
    @media (max-width: 767px) {
      /*height: 150px !important;*/
    }
  }

  .career-img {
    float: left;
    max-width: 45%;
    margin-bottom: 15px;
    margin-right: 20px;
  }

  .career-descr {
    margin-top: 0px !important;
    display: block !important;
  }

  @media screen and (max-width: 425px) {
    .career-img  {
      float: none;
      max-width: none;
      margin-right: 0;
  }
}
`
export default Wrapper
