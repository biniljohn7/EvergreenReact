import styled from 'styled-components'
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

  .gift-list-spn {
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    padding: 60px 0;
  }
`
export default Wrapper
