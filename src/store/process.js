import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { targetIssueState } from './common';
import { PROCESS_LIST } from '../constants/process';

const { persistAtom } = recoilPersist({
  key: 'persistprocesList',
  storage: localStorage,
});

const processListState = atom({
  key: 'procesList',
  default: PROCESS_LIST,
  effects_UNSTABLE: [persistAtom],
});

const processState = selector({
  key: 'process',
  get: ({ get }) => {
    const processList = get(processListState);
    const targetIssue = get(targetIssueState);

    return processList.find((process) => process.id === targetIssue.status);
  },
  set: ({ get, set }) => {
    const processList = get(processListState);
    const targetIssue = get(targetIssueState);

    let newProcessList;
    if (targetIssue.mode === 'ADD') {
      newProcessList = processList.map((process) =>
        process.id === targetIssue.status
          ? {
              ...process,
              issueCardList: [...process.issueCardList, targetIssue],
            }
          : process,
      );
    }
    if (targetIssue.mode === 'DELETE') {
      newProcessList = processList.filter(
        (process) => process.id !== targetIssue.status,
      );
    }
    set(processListState, newProcessList);
  },
});

export { processListState, processState };
