import styled from '@emotion/styled';
import { buttonNone } from '../../styles/mixin';
import IssueCard from '../IssueCard/Card';

const Container = (props) => {
  const {
    process: { title, issues },
  } = props;

  return (
    <IssueProcess>
      <IssueProcessTitle>{title}</IssueProcessTitle>
      <IssueCardList>
        {issues.length > 0
          ? issues.map((issue, index) => <IssueCard key={issue[index]} />)
          : null}
        <AddCardButton>+ 이슈 추가</AddCardButton>
      </IssueCardList>
    </IssueProcess>
  );
};

export default Container;

const IssueProcess = styled.section`
  flex-basis: 32rem;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;

const IssueProcessTitle = styled.h2`
  width: 100%;
  height: 4rem;
  color: black;
  font-size: 2rem;
`;

const IssueCardList = styled.ul`
  margin-top: 1rem;
`;

const AddCardButton = styled.button`
  margin-top: 1rem;
  font-size: 1.6rem;
  text-indent: 1rem;
  color: ${({ theme }) => theme.colors.gray59};
  ${buttonNone()}
`;
