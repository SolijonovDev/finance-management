import classNames from 'classnames';
import styles from './container.module.scss';

export const Container = (props) => {
  const { className, ...rest } = props;
  return (
    <div className={classNames({ [className]: className, [styles.container]: true })} {...rest} />
  );
};
