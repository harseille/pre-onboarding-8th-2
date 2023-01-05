import { forwardRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Input from '../common/Input';
import Button from '../common/Button';

const CardAddGroup = forwardRef((props, cardAddInputRef) => {
  const { addButtonHandler, cancelButtonHandler } = props;

  useEffect(() => {
    cardAddInputRef.current.focus();
  }, [cardAddInputRef]);

  return (
    <>
      <CardAddInput
        placeholder="할 일 제목을 입력해주세요."
        ref={cardAddInputRef}
      />
      <AddButton onClick={addButtonHandler}>추가</AddButton>
      <CancelButton onClick={cancelButtonHandler}>취소</CancelButton>
    </>
  );
});

export default CardAddGroup;

const CardAddInput = styled(Input)`
  margin-bottom: 2rem;
`;

const AddButton = styled(Button)``;
const CancelButton = styled(Button)`
  margin-left: 1rem;
  background: ${({ theme }) => theme.colors.gray59};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray87};
  }
`;
