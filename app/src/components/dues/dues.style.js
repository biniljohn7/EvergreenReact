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
  .gift-received-container{
    border: #d0b8d7 1px solid;
    border-radius: 15px;
    padding: 15px;
    
    .received-gift-container{
      background-color:#C00;
      min-height:100px;
    }
  }
  .gift-sent-container{
    border: #d0b8d7 1px solid;
    border-radius: 15px;
    padding: 15px;
    

    .gifted-gift-container{
      background-color:#FF9;
      min-height:100px;
    }
  }
  
`
export default Wrapper
