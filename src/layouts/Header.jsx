import styled from '@emotion/styled';

const Header = () => {
  return (
    <HeaderWrap>
      <HeaderInner>
        <h1>pre-onboarding issue tracker</h1>
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.header`
  position: fixed;
  width: 100%;
  z-index: 3;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.thin};
`;

const HeaderInner = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;

  & h1 {
    display: flex;
    align-items: center;
  }
`;
