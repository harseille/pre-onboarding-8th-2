import { atom } from 'recoil';

const targetIssueState = atom({
  key: 'targetIssue',
  default: {
    mode: null,
  },
});

export { targetIssueState };
