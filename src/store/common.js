import { atom } from 'recoil';

const targetIssueState = atom({
  key: 'targetIssue',
  default: {
    mode: null,
  },
});

const isShowModalState = atom({
  key: 'isShowModal',
  default: false,
});

const targetIssueCardIdState = atom({
  key: 'targetIssueCardId',
  default: null,
});

export { targetIssueState, isShowModalState, targetIssueCardIdState };
