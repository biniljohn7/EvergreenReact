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
    width: 100%;
    
    .received-gift-container{
      background-color:#C00;
      min-height:100px;
    }
  }
  .gift-sent-container{
    border: #d0b8d7 1px solid;
    border-radius: 15px;
    padding: 15px;
    width: 100%;
    

    .gifted-gift-container{
      background-color:#FF9;
      min-height:100px;

    }
  }
  
  .all-gifts {
      flex-wrap: wrap;
      gap: 0px !important;

      .gift-tabs {
          padding: 30px 15px 0 15px;
          border-top: dashed 2px #d9c6dd;
          width: 100%;
          margin-top: 40px;

          .gift-sent, .gift-received {
              border: 0;
              font-size: 13px;
              color: #5b2166;
              background-color: #d0b8d7;
              margin-right: 3px;
              width: 100px;
              padding: 15px 0 10px 0;
              border-radius: 20px 20px 0 0;
              &.active{
                  background-color: #500c68;
                  color: #fff;
              }
          }
      }
  }
`
export default Wrapper
