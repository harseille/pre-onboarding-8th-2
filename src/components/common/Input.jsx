import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 4rem;
  border: 0;
  padding: 10px 13px;
  font-size: 16px;

  &:read-only {
    background: transparent;
    color: ${({ theme }) => theme.trelloListTitle};
  }
`;

export default Input;
