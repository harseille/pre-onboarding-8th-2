import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useResetRecoilState, useRecoilState } from 'recoil';
import { isShowModalState, targetIssueCardIdState } from '../../store/common';
import { issueState } from '../../store/issue';
import Modal from '../common/Modal';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import InputGroup from './InputGroup';
import { flexbox } from '../../styles/mixin';
import { TARGET_ISSUE_MODE_UPDATE } from '../../constants/common';

const IssueModal = () => {
  const resetIsShowModal = useResetRecoilState(isShowModalState);
  const resetTargetIssueCardIdState = useResetRecoilState(
    targetIssueCardIdState,
  );

  const titleRef = useRef();
  const personRef = useRef();
  const dueDateRef = useRef();
  const contentRef = useRef();

  const [issue, setIssue] = useRecoilState(issueState);

  useEffect(() => {
    contentRef.current.value = issue.content ? issue.content : '';
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const newIssue = {
      mode: TARGET_ISSUE_MODE_UPDATE,
      id: issue.id,
      title: titleRef.current.value,
      status: issue.status,
      person: personRef.current.value,
      dueDate: dueDateRef.current.value,
      content: contentRef.current.value,
    };

    setIssue(newIssue);
    resetIsShowModal();
    resetTargetIssueCardIdState();
  };

  const clickCloseModalHandler = () => {
    resetIsShowModal();
    resetTargetIssueCardIdState();
  };

  return (
    <Modal width="80" onClose={clickCloseModalHandler}>
      <Form onSubmit={submitHandler}>
        <InputGroup
          id="title"
          type="text"
          labelValue="제목"
          isReadonly="false"
          value={issue.title}
          ref={titleRef}
        />
        <InputGroup
          id="person"
          type="text"
          labelValue="담당자"
          isReadonly="true"
          value={issue.person}
          ref={personRef}
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
          ref={dueDateRef}
        />
        <ContentsTextarea placeholder="내용을 입력해주세요" ref={contentRef} />
        <ButtonGroup>
          <SaveButton type="submit">저장</SaveButton>
          <CancelButton onClick={clickCloseModalHandler}>취소</CancelButton>
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
