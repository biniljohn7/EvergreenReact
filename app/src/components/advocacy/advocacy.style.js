import styled from 'styled-components';
import Bg from '../../assets/images/new-page-resources.png';

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

  .search {
    border: 1px solid #c4cdd5;
    border-radius: 20px;
  }

  .search:focus {
    outline: none;
  }

  .pwd {
    position: absolute;
    right: 30px;
    top: 30%;
  }

  .signature {
    object-fit: contain;
    object-position: right;
  }

  .file-upload {
    position: relative;
    display: block;
  }

  .file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width: 0;
    height: 100%;
    opacity: 0;
  }

  .empty-img {
    background-color: #ddd;
    padding-top: 100%;
    position: relative;
  }
  .empty-img .empty-icn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5em;
  }

  .three-cl-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 40px;
  }

  .three-cl-row .col-3 {
    background-image: url(${Bg});
    width: calc(50% - 10px);
    text-align: center;
    border: 1px solid #5B2166;
    border-radius: 25px;
    padding: 30px;   
    min-height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 580px) {
      width: calc(100% - 10px);
    }
  }

  .three-cl-row .col-3 .col-link {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
    @media (max-width: 1360px) {
      font-size: 27px;
    }
    @media (max-width: 1260px) {
      font-size: 20px;
    }
    @media (max-width: 991px) {
      font-size: 16px;
    }
    @media (max-width: 580px) {
      font-size: 25px;
    }
    @media (max-width: 375px) {
      font-size: 22px;
    }
  }

  .three-cl-row .col-3 .col-link .icn {
    font-size: 2em;
    font-weight: 600;
  }

  .ncnw-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }

`
export default Wrapper
