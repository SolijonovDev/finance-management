import { useEffect } from 'react';
import { Header } from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesData } from './../redux-store/actions/expensesAction';
import { fetchIncomesData } from '../redux-store/actions/incomesAction';

import styles from './mainLayout.module.scss';

export const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  const { error: incomesError, status: incomesStatus } = useSelector(state => state.income);
  const { error: expensesError, status: expensesStatus } = useSelector(state => state.expense);

  useEffect(() => {
    dispatch(fetchIncomesData());
    dispatch(fetchExpensesData());
  }, []);

  return (
    <div>
      <Header />
      {(incomesStatus === 'loading' || expensesStatus === 'loading') && (
        <div className={styles.loadingPanel}>Подождите, идёт загрузка...</div>
      )}
      {(expensesError || incomesError) && (
        <div className={styles.errorPanel}>
          <h4>Ошибка что-то пошло не так </h4>
          <p>{expensesError || incomesError}</p>
        </div>
      )}
      {incomesStatus === 'succeeded' && expensesStatus === 'succeeded' && (
        <main className={styles.main}>{children}</main>
      )}
    </div>
  );
};
