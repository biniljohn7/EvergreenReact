import styled from 'styled-components'
// import { HEADER_COLOR } from '../../helper/constant'

const Wrapper = styled.div`
  .nav-tabs .nav-link {
    color: #637381;
    border-color: #fff #fff #dee2e6 #fff;
    padding: 0.5rem 1rem 0.5rem 0;
  }

  .nav-tabs .nav-link.active {
    font-weight: bold;
  }

  .nav-link:hover {
    cursor: pointer;
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
    background-color: #302f2f;
    // background-color: #34bebf;
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    @media (max-width: 767px) {
      height: 50px;
      width: 50px;
      font-size: 12px !important;
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
    height: 300px;
    object-fit: contain;
    @media (max-width: 767px) {
      height: 150px !important;
    }
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 0;
  }

  i {
    padding-right: 5px;
  }

  ul {
    list-style-type: none;
  }
`
export default Wrapper
