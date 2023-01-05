import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { targetIssueCardIdState } from './common';
import { processListState } from './process';
import {
  TARGET_ISSUE_MODE_ADD,
  TARGET_ISSUE_MODE_UPDATE,
  TARGET_ISSUE_MODE_DELETE,
} from '../constants/common';

const { persistAtom } = recoilPersist({
  key: 'persistIssueList',
  storage: localStorage,
});

const issueListState = atom({
  key: 'issueList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const issueState = selector({
  key: 'issue',

  get: ({ get }) => {
    const issueList = get(issueListState);
    const targetIssueCardId = get(targetIssueCardIdState);

    return issueList.find((issue) => issue.id === targetIssueCardId);
  },
  set: ({ get, set }, targetIssue) => {
    const processList = get(processListState);
    const issueList = get(issueListState);

    let newIssueList;
    let newProcessList;

    const targetProcess = processList.find(
      (process) => process.id === targetIssue.status,
    );

    if (targetIssue.mode === TARGET_ISSUE_MODE_ADD) {
      newIssueList = [...issueList, targetIssue];

      newProcessList = processList.map((process) =>
        process.id === targetProcess.id
          ? {
              ...process,
              issueCardList: [...targetProcess.issueCardList, targetIssue],
            }
          : process,
      );
    }
    if (targetIssue.mode === TARGET_ISSUE_MODE_DELETE) {
      newIssueList = issueList.filter((issue) => issue.id !== targetIssue.id);

      newProcessList = processList.map((process) =>
        process.id === targetProcess.id
          ? {
              ...process,
              issueCardList: process.issueCardList.filter(
                (issueCard) => issueCard.id !== targetIssue.id,
              ),
            }
          : process,
      );
    }
    if (targetIssue.mode === TARGET_ISSUE_MODE_UPDATE) {
      newIssueList = issueList.map((issue) =>
        issue.id === targetIssue.id
          ? {
              ...issue,
              ...targetIssue,
            }
          : issue,
      );

      newProcessList = processList.map((process) =>
        process.id === targetProcess.id
          ? {
              ...process,
              issueCardList: process.issueCardList.map((issueCard) =>
                issueCard.id === targetIssue.id
                  ? {
                      ...issueCard,
                      title: targetIssue.title,
                    }
                  : issueCard,
              ),
            }
          : process,
      );
    }

    set(issueListState, newIssueList);
    set(processListState, newProcessList);
  },
});

// export { issueListState, targetIssueState, issueCardState, issueState };
export { issueListState, issueState };
