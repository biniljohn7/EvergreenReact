import styled from "styled-components";
import BannerImg from '../../assets/images/banner-bg.png'



const Warpper = styled.div`
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

  .box {
    // background-image: linear-gradient(#34bebf, #153bf6);
    width: 100%;
    height: ${(props) => props.size || "158px"};
  }

  .image-size {
    width: 100%;
    height: ${(props) => props.size || "158px"};
    object-fit: contain;
  }

  .date {
    position: absolute;
    right: 10px;
    bottom: -25px;
    height: 60px;
    width: 60px;
    color: #ffffff;
    background-color: #302f2f;
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

  .news-date {
    position: absolute;
    top: 0;
    right: 10px;
  }

  .discount {
    // background-image: linear-gradient(#34bebf, #153bf6);
    background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* new landing page banner  */
  .new-banner {
      background-image: url(${BannerImg});
  }

  .explore-resources{
    text-align: center;
    color: #fff;
    font-size: 96px;
    line-height: 96px;
    padding: 40px 0;
    font-family:
  }
`;

export default Warpper;
