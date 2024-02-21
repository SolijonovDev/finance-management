import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Container } from '../container/Container';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link to="/" className={styles.logo}>
          Главная
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                classNames({ [styles.active]: isActive, [styles.menuItemLink]: true })
              }>
              Доходы
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink
              to="/expense"
              className={({ isActive }) =>
                classNames({ [styles.active]: isActive, [styles.menuItemLink]: true })
              }>
              Расходы
            </NavLink>
          </li>
        </ul>
      </Container>
    </header>
  );
};
