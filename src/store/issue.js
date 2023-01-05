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
  key: 'persist',
  storage: localStorage,
});

const issueListState = atom({
  key: 'issueList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// const issueCardState = selector({
//   key: 'issueCard',
//   /**
//    * * Process에서 선택된 카드의 id를 가져온다.
//    * @param {*} param0
//    * @returns
//    */
//   get: ({ get }) => {
//     const process = get(processState);
//     const targetIssue = get(targetIssueState);

//     return process.issueCardList.find(
//       (issueCard) => issueCard.id === targetIssue.id,
//     );
//   },
//   /**
//    * * 타겟의 process에서 타겟의 title을 변경한다.
//    * @param {*} param0
//    */
//   set: ({ get, set }) => {
//     const processList = get(processListState);
//     const process = get(processState);
//     const targetIssue = get(targetIssueState);

//     if (targetIssue.mode !== 'UPDATE') return;

//     const newProcess = process.issueCardList.map((issueCard) =>
//       issueCard.id === targetIssue.id
//         ? {
//             ...issueCard,
//             title: targetIssue.title,
//           }
//         : issueCard,
//     );

//     const newProcessList = processList.map((process) =>
//       process.id === newProcess.id
//         ? {
//             ...newProcess,
//           }
//         : process,
//     );

//     set(processListState, newProcessList);
//   },
// });

const issueState = selector({
  key: 'issue',

  get: ({ get }) => {
    // const issueList = get(issueListState);
    const { issueList } = JSON.parse(localStorage.getItem('persistIssueList'));
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
              ...targetIssue,
            }
          : issue,
      );
    }

    set(processListState, newProcessList);
    set(issueListState, newIssueList);
  },
});

// export { issueListState, targetIssueState, issueCardState, issueState };
export { issueListState, issueState };
