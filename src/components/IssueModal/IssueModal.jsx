import styled from '@emotion/styled';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { isShowModalState, targetIssueCardIdState } from '../../store/common';
import { issueState } from '../../store/issue';
import Modal from '../common/Modal';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import InputGroup from './InputGroup';
import { flexbox } from '../../styles/mixin';

const IssueModal = () => {
  const resetIsShowModal = useResetRecoilState(isShowModalState);
  const resetTargetIssueCardIdState = useResetRecoilState(
    targetIssueCardIdState,
  );

  const issue = useRecoilValue(issueState);
  console.log(issue);

  const ClickCloseModalHandler = () => {
    resetIsShowModal();
    resetTargetIssueCardIdState();
  };

  return (
    <Modal width="80" onClose={ClickCloseModalHandler}>
      <Form>
        <InputGroup
          id="title"
          type="text"
          labelValue="제목"
          isReadonly="false"
          value={issue.title}
        />
        <InputGroup
          id="status"
          type="text"
          labelValue="상태"
          isReadonly="true"
          value={issue.status}
        />
        <InputGroup
          id="person"
          type="text"
          labelValue="담당자"
          isReadonly="true"
          value={issue.person}
        />
        {/* <AutocompleteList>
        <SuggestItem>
        <Name>테스트</Name>
        </SuggestItem>
      </AutocompleteList> */}
        <InputGroup
          id="dueDate"
          type="datetime-local"
          labelValue="마감일"
          isReadonly="false"
          value={issue.dueDate}
        />
        <ContentsTextarea placeholder="내용을 입력해주세요" />
        <ButtonGroup>
          <SaveButton type="submit">저장</SaveButton>
          <CancelButton>취소</CancelButton>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default IssueModal;

const Form = styled.form`
  ${flexbox('column', 'space-between')};
  gap: 1.2rem;
`;

const ContentsTextarea = styled(Textarea)`
  border: 1px solid ${({ theme }) => theme.colors.grayDDD};
  border-radius: 0.5rem;
`;

const ButtonGroup = styled.div`
  font-size: 1.6rem;
`;

const SaveButton = styled(Button)``;

const CancelButton = styled(Button)`
  margin-left: 1rem;
  background: ${({ theme }) => theme.colors.gray59};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray87};
  }
`;
