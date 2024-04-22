import styled from 'styled-components'
const Wrapper = styled.div`
  .payment {
    width: 45%;
    margin: 0 auto;
    @media (max-width: 500px) {
      width: 80%;
    }
  }

  .card-name {
    letter-spacing: 5px;
    font-size: 20px;
    @media (max-width: 1024px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }

  .expiry-date {
    position: absolute;
    right: 0;
  }

  .card {
    background-image: linear-gradient(#0000f5, #5190fc);
  }

  .card-holder {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .box {
    min-height: 50px;
    font-size: 16px;
    @media (max-width: 1024px) {
      font-size: 12px;
    }
  }

  .valid-through {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .radio-button {
    height: 20px;
    width: 20px;
    margin-left: 0;
  }
`

export default Wrapper
