import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../components/container/Container';
import { AddNewIcome } from './AddNewIcome';
import { deleteIncome } from '../../redux-store/reducers/incomeReducer';
import { EditModal } from './EditModal';
import { List } from '../../components/list/List';
import { Portal } from '../../components/portal/Portal';

export const IncomeView = () => {
  const [currentIncomeId, setCurrentIncomeId] = useState('');
  const { incomes } = useSelector((state) => state.income);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteIncome(id));
  };

  const handleCloseEditModal = () => setCurrentIncomeId('');
  const handleOpenEditModal = (id) => setCurrentIncomeId(id);

  return (
    <Container>
      <AddNewIcome />
      <List items={incomes} handleEdit={handleOpenEditModal} handleDelete={handleDelete} />
      <Portal
        showModal={!!currentIncomeId}
        content={<EditModal id={currentIncomeId} onClose={handleCloseEditModal} />}
      />
    </Container>
  );
};
