import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import useDnD from '../../hooks/common/useDnD';
import { buttonNone } from '../../styles/mixin';
import { TARGET_ISSUE_MODE_DELETE } from '../../constants/common';
import { issueState } from '../../store/issue';
import { isShowModalState, targetIssueCardIdState } from '../../store/common';
import IssueModal from '../IssueModal/IssueModal';

const IssueCard = (props) => {
  const {
    issue: { title, id },
    processId,
  } = props;

  const { dragStartHandler, dragOverHandler } = useDnD();

  const setIssuState = useSetRecoilState(issueState);
  const [isShowModal, setIsShowModal] = useRecoilState(isShowModalState);
  const [targetIssueCardId, setTargetIssueCardId] = useRecoilState(
    targetIssueCardIdState,
  );

  const clickDeleteIssueButtonHandler = () => {
    setIssuState({
      mode: TARGET_ISSUE_MODE_DELETE,
      id,
      status: processId,
    });
  };

  const clickIssueItemHandler = () => {
    setTargetIssueCardId(id);
    setIsShowModal(true);
  };

  return (
    <>
      {isShowModal && targetIssueCardId === id && <IssueModal />}
      <Card
        onClick={clickIssueItemHandler}
        data-card-id={id}
        draggable
        onDragStart={dragStartHandler}
        onDragOver={dragOverHandler}
      >
        <Title>{title}</Title>
        <DeleteCardButton onClick={clickDeleteIssueButtonHandler}>
          🗑️
        </DeleteCardButton>
      </Card>
    </>
  );
};

export default IssueCard;

const Card = styled.li`
  position: relative;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.grayDDD};
  cursor: pointer;
  border: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
  }
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
