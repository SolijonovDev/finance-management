import { useState } from 'react';
import { Portal } from '../../components/portal/Portal';
import { AddNewIncomeModal } from './AddNewIncomeModal';

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
        content={<AddNewIncomeModal onClose={() => setShowModal(false)} />}
      />
    </div>
  );
};
