import styles from './baseModal.module.scss';

export const BaseModal = ({ title, onClose, children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            Закрыт
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
