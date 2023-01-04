import { useState, useRef } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { buttonNone } from '../../styles/mixin';
import IssueCard from '../IssueCard/Card';
import CardAddGroup from './CardAddGroup';
import {
  CARD_FORM_MODE,
  CARD_VIEW_MODE,
  TARGET_ISSUE_MODE_ADD,
} from '../../constants/common';
import { issueState } from '../../store/issue';

const Container = (props) => {
  const {
    process: { id, title, issueCardList },
  } = props;

  // const setIssuState = useSetRecoilState(issueState);
  const [cardMode, setCardMode] = useState(CARD_VIEW_MODE);

  const cardAddInputRef = useRef();

  const clickChangeCardModeHandler = () => {
    setCardMode((prevMode) =>
      prevMode === CARD_VIEW_MODE ? CARD_FORM_MODE : CARD_VIEW_MODE,
    );
  };

  // Todo: useIssue Hooks 만들기
  // 이슈 추가를 하면 issueList에 추가 되고 processList를 업데이트 한다.
  const setIssuState = useSetRecoilState(issueState);

  // const [targetIssue, setTargetIssue] = useRecoilState(targetIssueState);

  const clickAddIssueButtonHandler = () => {
    if (cardAddInputRef.current.value.trim() === '') return;

    setIssuState({
      mode: TARGET_ISSUE_MODE_ADD,
      id: uuidv4(),
      status: id,
      title: cardAddInputRef.current.value,
    });

    setCardMode((prevMode) =>
      prevMode === CARD_VIEW_MODE ? CARD_FORM_MODE : CARD_VIEW_MODE,
    );
    // cardAddInputRef.current.value = '';
  };

  return (
    <IssueProcess>
      <IssueProcessTitle>{title}</IssueProcessTitle>
      <IssueCardList>
        {issueCardList.length > 0
          ? issueCardList.map((issue) => (
              <IssueCard key={issue.id} title={issue.title} />
            ))
          : null}
        <ButtonGroupWrapper>
          {cardMode === CARD_VIEW_MODE ? (
            <AddCardButton onClick={clickChangeCardModeHandler}>
              + 이슈 추가
            </AddCardButton>
          ) : (
            <CardAddGroup
              ref={cardAddInputRef}
              addButtonHandler={clickAddIssueButtonHandler}
              cancelButtonHandler={clickChangeCardModeHandler}
              processId={id}
            />
          )}
        </ButtonGroupWrapper>
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
  text-indent: 1rem;
  color: ${({ theme }) => theme.colors.gray59};
  ${buttonNone()}
`;

const ButtonGroupWrapper = styled.section`
  font-size: 1.6rem;
  margin-top: 1rem;
`;
