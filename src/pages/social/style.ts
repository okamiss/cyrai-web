import styled from 'styled-components'

export const ContentBox = styled.div`
  width: var(--container-width);
  margin: 0 auto;
  display: flex;
  .box-left {
    width: 800px;
    .banner{
      width: 100%;
      height: 400px;
    }
  }
  .box-right{
    flex: 1;
  }
`
