import { atom } from 'recoil';
import { PROCESS_LIST } from '../constants';

const processState = atom({
  key: 'processState',
  default: PROCESS_LIST,
});

export { processState };
