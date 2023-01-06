import { useState } from 'react';
import { INITIAL_POSITION } from '../../constants/common';

const getPositionInfo = (element, y) => {
  if (element.tagName !== 'UL' && element.tagName !== 'LI') return;

  if (element.tagName === 'UL') {
    console.dir(element);
    return { position: 'ul', targetId: element.dataset.processId };
  }

  const info = element.getBoundingClientRect();
  const offset = y - info.top - info.height / 2;

  return offset < 0
    ? {
        position: 'before',
        targetId: element.dataset.cardId,
      }
    : {
        position: 'after',
        targetId: element.dataset.cardId,
      };
};

const useDnD = () => {
  const [positionInfo, setPositionInfo] = useState(INITIAL_POSITION);

  // dragStartHandler
  const dragStartHandler = (e) => {
    const draggedIssueId = e.target.dataset.cardId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('draggedIssueId', draggedIssueId);
  };
  // dragOverHandler
  const dragOverHandler = (e) => {
    e.preventDefault();
    const newPositionInfo = getPositionInfo(e.target, e.clientY);

    if (!newPositionInfo) return;

    console.log(newPositionInfo);
    // e.dataTransfer.dropEffect = 'move';
  };

  // dragDropHandler
  const dragDropHandler = (e) => {
    e.preventDefault();
    const draggedIssueId = e.dataTransfer.getData('draggedIssueId');
    console.log(draggedIssueId);
  };

  return {
    dragStartHandler,
    dragOverHandler,
    dragDropHandler,
  };
};

export default useDnD;
