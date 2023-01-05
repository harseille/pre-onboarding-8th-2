import styled from '@emotion/styled';
import Input from '../common/Input';
import { flexbox } from '../../styles/mixin';
import { ISSUE_STATUS } from '../../constants/issue';

const InputGroup = (props) => {
  const { id, type, labelValue, isReadonly, value } = props;

  return (
    <Wrapper>
      <ModalLabel htmlFor={id}>{labelValue}</ModalLabel>
      <ModalInput
        type={type}
        id={id}
        readonly={isReadonly}
        value={value ? (type === 'status' ? ISSUE_STATUS[value] : value) : ''}
      />
    </Wrapper>
  );
};

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
