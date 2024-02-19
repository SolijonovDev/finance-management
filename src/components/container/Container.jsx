import styles from './container.module.scss';

export const Container = (props) => {
  return <div className={styles.container} {...props} />;
};
