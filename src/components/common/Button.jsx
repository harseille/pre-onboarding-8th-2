import styled from '@emotion/styled';

const Button = styled.button`
  height: 3.6rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  border: 0;
  font-size: 1gpx;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primaryOrange};
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subOrange};
  }
`;

export default Button;
