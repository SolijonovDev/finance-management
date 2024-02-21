import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../../components/container/Container';
import { List } from '../../components/list/List';
import { ChartPanel } from './ChartPanel';
import { reduceAllSumms } from '../../helpers/reduceSum';

import styles from './homeView.module.scss';

export const HomeView = () => {
  const { expenses } = useSelector((state) => state.expense);
  const { incomes } = useSelector((state) => state.income);

  const [exps, setExps] = useState(0);
  const [icms, setIcms] = useState(0);

  useEffect(() => {
    setExps(reduceAllSumms(expenses));
    setIcms(reduceAllSumms(incomes));
  }, [expenses, incomes]);

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
