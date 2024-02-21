import classNames from 'classnames';

import styles from './submitButton.module.scss';

export const SubmitButton = (props) => {
  const { className, children, ...rest } = props;
  return (
    <button className={classNames({ [className]: className, [styles.btn]: true })} {...rest}>
      {children}
    </button>
  );
};
