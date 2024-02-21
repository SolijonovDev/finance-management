import { useState } from 'react';
import { ModalContent } from './ModalContent';
import { Portal } from '../../components/portal/Portal';

import styles from './addNewIncome.module.scss';

export const AddNewIcome = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);

  return (
    <div className={styles.addNewIncome}>
      <button className={styles.btn} onClick={handleClick}>
        + Новый доход
      </button>
      <Portal
        showModal={showModal}
        content={<ModalContent onClose={() => setShowModal(false)} />}
      />
    </div>
  );
};
