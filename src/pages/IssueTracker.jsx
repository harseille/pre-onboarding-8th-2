import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { processListState } from '../store/process';
import { autoMargin, flexbox } from '../styles/mixin';
import IssueProcess from '../components/IssueProcess/Container';

const IssueTracker = () => {
  const processList = useRecoilValue(processListState);

  return (
    <Container>
      <Wrapper>
        {processList.map((process) => (
          <IssueProcess key={process.id} process={process} />
        ))}
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
  height: 100vh;
  padding-top: 10rem;
  ${flexbox('row', 'space-around', 'flex-start')} ${autoMargin()};
`;
