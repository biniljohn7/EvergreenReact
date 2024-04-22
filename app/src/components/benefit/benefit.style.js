import styled from 'styled-components'
import { HEADER_COLOR, SECONDARY_COLOR } from '../../helper/constant'

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

  .image-size {
    height: 30px;
    width: 30px;
    object-fit: contain;
  }

  .company-logo {
    height: 50px;
    width: 50px;
    // object-fit: contain;
  }

  .coupon {
    border: 1px dashed #343a40;
    border-radius: 5px;
    background-color: #f5f6f6;
    color: #e10001;
    // color: #153bf6;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(
      ${(props) => props.col || 3},
      ${(props) => props.width || '33%'}
    );
    column-gap: 10px;
    row-gap: 10px;
  }

  .grid-item {
    text-align: center;
    background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    // background-image: linear-gradient(#34bebf, #153bf6);
    // background-color: ${HEADER_COLOR};
    width: 100%;
    padding-bottom: 75%;
  }

  .benefit-item {
    text-align: center;
    background: #e10001;
    border-radius: 10px;
    width: 100%;
    padding-bottom: 75%;
  }

  .benefit-container {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-column-gap: 20px;
    padding: 30px 10px;
    // padding: 20px 10px 10px 10px;
    // background-image: linear-gradient(#34bebf, #153bf6);
    // background-image: linear-gradient(180deg, #c33ed7 0%, #e10001 100%);
    background-color: ${HEADER_COLOR};
  }

  .benefit-detail-container {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-column-gap: 20px;
    padding: 30px 10px;
    // padding: 20px 10px 10px 10px;
    // background-image: linear-gradient(#34bebf, #153bf6);
    background-image: linear-gradient(
      180deg,
      ${SECONDARY_COLOR} 0%,
      ${HEADER_COLOR} 100%
    );
  }

  .benefit-part1 {
    grid-column-start: 1;
    // width: 100%;
  }

  .benefit-part2 {
    grid-column-start: 2;
    // width: 100%;
    padding-right: 40px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .filter {
    position: absolute;
    right: 0;
  }

  .terms {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .report {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`
export default Wrapper
