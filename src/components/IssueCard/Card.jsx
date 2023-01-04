import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { buttonNone } from '../../styles/mixin';
import { TARGET_ISSUE_MODE_DELETE } from '../../constants/common';
import { issueState } from '../../store/issue';

const IssueCard = (props) => {
  const {
    issue: { title, id },
    processId,
  } = props;

  const setIssuState = useSetRecoilState(issueState);

  const clickDeleteIssueButtonHandler = () => {
    setIssuState({
      mode: TARGET_ISSUE_MODE_DELETE,
      id,
      status: processId,
    });
  };

  return (
    <Card>
      <Title>{title}</Title>
      <DeleteCardButton onClick={clickDeleteIssueButtonHandler}>
        🗑️
      </DeleteCardButton>
    </Card>
  );
};

export default IssueCard;

const Card = styled.li`
  position: relative;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.grayDDD}; ;
`;

const Title = styled.span`
  display: block;
  padding-right: 40px;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
`;

const DeleteCardButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  font-size: 1.6rem;
  ${buttonNone()}
  background: ${({ theme }) => theme.colors.grayF5};
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  padding: 0.6rem;
  border-radius: 0.4rem;
`;
