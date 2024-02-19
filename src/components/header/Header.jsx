import { Container } from '../container/Container';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h2>Header</h2>
      </Container>
    </header>
  );
};
