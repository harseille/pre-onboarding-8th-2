import styled from '@emotion/styled';
import { buttonNone } from '../../styles/mixin';

const IssueCard = () => {
  return (
    <Card>
      <Title>이슈</Title>
      <DeleteCardButton>🗑️</DeleteCardButton>
    </Card>
  );
};

export default IssueCard;

const Card = styled.li`
  position: relative;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.grayDDD}; ;
`;

const Title = styled.span`
  display: block;
  padding-right: 40px;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
`;

const DeleteCardButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  font-size: 1.6rem;
  ${buttonNone()}
  background: ${({ theme }) => theme.colors.grayF5};
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  padding: 0.6rem;
  border-radius: 0.4rem;
`;
