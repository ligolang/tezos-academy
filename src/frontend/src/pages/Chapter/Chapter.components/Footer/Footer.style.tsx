import styled from 'styled-components/macro'

export const FooterStyled = styled.div`
  height: 50px;

  > a:nth-child(1) {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  > a:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

export const FooterCredits = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    margin-top: 3ex;
  }

  a,
  a:visited {
    display: inline-block;
    color: #08658b;
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    display: none;
  }
`
