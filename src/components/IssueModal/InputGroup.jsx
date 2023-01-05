import { forwardRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Input from '../common/Input';
import { flexbox } from '../../styles/mixin';

const InputGroup = forwardRef((props, ref) => {
  const { id, type, labelValue, value } = props;

  useEffect(() => {
    ref.current.value = value || '';
  }, []);

  return (
    <Wrapper>
      <ModalLabel htmlFor={id}>{labelValue}</ModalLabel>
      <ModalInput type={type} id={id} ref={ref} />
    </Wrapper>
  );
});

export default InputGroup;

const Wrapper = styled.div`
  ${flexbox('row', 'space-between', 'center')}
`;

const ModalInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.grayDDD};
  border-radius: 0.5rem;
`;

const ModalLabel = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;
