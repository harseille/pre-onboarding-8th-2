import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const ModalLayout = ({ modal }) => {
  return (
    <DimmedLayer onClick={modal.onClose}>
      <ModalBody width={modal.width}>{modal.children}</ModalBody>
    </DimmedLayer>
  );
};

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <ModalLayout modal={props} />,
        document.querySelector('#modal__root'),
      )}
    </>
  );
};

const DimmedLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ width }) => width + 'px'};
  padding: 20px;
  border-radius: 8px;
  transform: translate3d(-50%, -50%, 0);
  background: ${({ theme }) => theme.trelloListBg};
`;

export default Modal;
