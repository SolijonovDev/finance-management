import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../components/container/Container';
import { List } from '../../components/list/List';
import { ExpenseCategories } from './ExpenseCategories';
import { deleteExpense } from '../../redux-store/reducers/expenseReducer';
import { Portal } from '../../components/portal/Portal';
import { EditModal } from './EditModal';

export const ExpenseView = () => {
  const [showModal, setShowModal] = useState(false);
  const { expenses } = useSelector(state => state.expense);
  const dispatch = useDispatch();
  const [currentExpenseId, setCurrentExpenseId] = useState('');

  const handleEdit = id => {
    setShowModal(true);
    setCurrentExpenseId(id);
  };

  const handleDelete = id => {
    dispatch(deleteExpense(id));
    setCurrentExpenseId(id);
  };

  return (
    <Container>
      <ExpenseCategories />
      <List items={expenses} handleEdit={handleEdit} handleDelete={handleDelete} />
      <Portal
        showModal={showModal}
        content={<EditModal id={currentExpenseId} onClose={() => setShowModal(false)} />}
      />
    </Container>
  );
};
