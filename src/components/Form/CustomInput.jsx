import classNames from 'classnames';

import styles from './customInput.module.scss';

export const CustomInput = ({ label, errors, register, name, ...rest }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <input
        className={classNames({ [styles.error]: errors, [styles.input]: true })}
        {...register(name)}
        {...rest}
      />
      {errors && <p className={styles.errorText}>{errors.message}</p>}
    </>
  );
};
