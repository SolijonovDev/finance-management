import { useEffect, useState } from 'react';
import { Container } from '../../components/container/Container';
import { List } from '../../components/list/List';
import { ChartPanel } from './ChartPanel';
import styles from './homeView.module.scss';
import { useSelector } from 'react-redux';

export const HomeView = () => {
  const { expenses } = useSelector((state) => state.expense);
  const { incomes } = useSelector((state) => state.income);
  const [exps, setExps] = useState(0);
  const [icms, setIcms] = useState(0);

  useEffect(() => {
    const exps = expenses.reduce((a, b) => a + b.price, 0);
    const icms = incomes.reduce((a, b) => a + b.price, 0);
    setExps(exps);
    setIcms(icms);
  }, [expenses]);
  return (
    <Container className={styles.hoemView}>
      <div className={styles.table}>
        <div>
          <h2 className={styles.rowTitle}>Доходы: {icms} сум</h2>
          <List items={incomes} hideBtns={true} />
        </div>
        <div>
          <h2 className={styles.rowTitle}>Расходы: {exps} сум</h2>
          <List items={expenses} hideBtns={true} />
        </div>
      </div>
      <ChartPanel />
    </Container>
  );
};
