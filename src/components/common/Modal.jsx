import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const DimmedLayer = (props) => {
  const { onClose } = props;
  return <DimmedLayerWapper onClick={onClose} />;
};

const ModalLayout = ({ modal }) => {
  return <ModalBody width={modal.width}>{modal.children}</ModalBody>;
};

const Modal = (props) => {
  const { onClose } = props;
  return (
    <>
      {createPortal(
        <DimmedLayer onClose={onClose} />,
        document.getElementById('dimmedLayer_root'),
      )}
      {createPortal(
        <ModalLayout modal={props} />,
        document.getElementById('modal_root'),
      )}
    </>
  );
};

const DimmedLayerWapper = styled.div`
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
  width: ${({ width }) => width + 'rem'};
  transform: translate3d(-50%, -50%, 0);
  border-radius: 1rem;
  padding: 4rem;
  background: ${({ theme }) => theme.colors.white};
  z-index: 1;
`;

export default Modal;
