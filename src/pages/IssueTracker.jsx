import styled from '@emotion/styled';
import { autoMargin, flexbox } from '../styles/mixin';
import IssueProcess from '../components/IssueProcess/Container';

const IssueTracker = () => {
  return (
    <Container>
      <Wrapper>
        <IssueProcess />
      </Wrapper>
    </Container>
  );
};

export default IssueTracker;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.grayEEE};
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 120rem;
  background: ${({ theme }) => theme.colors.primaryBlue};
  height: 100vh;
  padding-top: 10rem;
  ${flexbox('row', 'space-around', 'flex-start')} ${autoMargin()};
`;
