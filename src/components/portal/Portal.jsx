import { createPortal } from 'react-dom';

export const Portal = ({ showModal, content }) => {
  return <>{showModal && createPortal(content, document.body)}</>;
};
