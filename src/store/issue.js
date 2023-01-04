import { atom, selector } from 'recoil';
import { targetIssueState } from './common';
import { processListState, processState } from './process';

const issueListState = atom({
  key: 'issueList',
  default: [],
});

const issueCardState = selector({
  key: 'issueCard',
  /**
   * * Process에서 선택된 카드의 id를 가져온다.
   * @param {*} param0
   * @returns
   */
  get: ({ get }) => {
    const process = get(processState);
    const targetIssue = get(targetIssueState);

    return process.issueCardList.find(
      (issueCard) => issueCard.id === targetIssue.id,
    );
  },
  /**
   * * 타겟의 process에서 타겟의 title을 변경한다.
   * @param {*} param0
   */
  set: ({ get, set }) => {
    const processList = get(processListState);
    const process = get(processState);
    const targetIssue = get(targetIssueState);

    if (targetIssue.mode !== 'UPDATE') return;

    const newProcess = process.issueCardList.map((issueCard) =>
      issueCard.id === targetIssue.id
        ? {
            ...issueCard,
            title: targetIssue.title,
          }
        : issueCard,
    );

    const newProcessList = processList.map((process) =>
      process.id === newProcess.id
        ? {
            ...newProcess,
          }
        : process,
    );

    set(processListState, newProcessList);
  },
});

const issueState = selector({
  key: 'issue',

  get: ({ get }) => {
    const issueList = get(issueListState);
    const targetIssue = get(targetIssueState);

    return issueList.find((issue) => issue.id === targetIssue.id);
  },
  set: ({ get, set }) => {
    const issueList = get(issueListState);
    const targetIssue = get(targetIssueState);

    let newIssueList;
    if (targetIssue.mode === 'ADD') {
      newIssueList = issueList.map((issue) =>
        issue.id === targetIssue.id
          ? {
              ...targetIssue,
            }
          : issue,
      );
      // set(issueCardState, targetIssue);
    }
    if (targetIssue.mode === 'DELETE') {
      newIssueList = issueList.filter((issue) => issue.id !== targetIssue.id);
    }
    if (targetIssue.mode === 'UPDATE') {
      newIssueList = issueList.map((issue) =>
        issue.id === targetIssue.id
          ? {
              ...targetIssue,
            }
          : issue,
      );
      // set(issueCardState, targetIssue);
    }

    set(issueList, newIssueList);
  },
});

export { issueListState, targetIssueState, issueCardState, issueState };

// const issue = {
//   id: 0,
//   title: '',
//   content: '',
//   dueDate: '',
//   status: '',
//   person: '',
// };
