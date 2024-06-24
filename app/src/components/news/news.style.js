import styled from "styled-components";
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
      ${(props) => props.width || "33%"}
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
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.size || "100px"};
    background-image: linear-gradient(180deg, red, white);
  }

  .image-size {
    /* width: 100%; */
    height: ${(props) => "100px"};
    object-fit: fill;
  }

  .full-image {
    object-fit: contain;
    height: ${(props) => "100px"};
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

  .dropdown {
    position: absolute;
    right: 0;
    top: 0;
  }

`;
export default Wrapper;
