import styled from 'styled-components'

const CommonWrapper = styled.div`
  .flex-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }

  .flex-item {
    flex: 50%;
  }

  .loader {
    min-height: 100vh;
  }
`
export default CommonWrapper
