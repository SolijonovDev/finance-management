import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Portal } from '../../components/portal/Portal';
import { AddNewExpenseModal } from './AddNewExpenseModal';
import { AddNewCategoryModal } from './AddNewCategoryModal';

import styles from './expenseCategories.module.scss';

export const ExpenseCategories = () => {
  const [showCategoryModal, setCategoryShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const { categories } = useSelector(state => state.expense);

  const handleChangeCurrentCategory = category => {
    setCurrentCategory(category);
  };

  return (
    <div className={styles.expenseCategories}>
      {categories.map(category => (
        <button
          className={styles.categoryItem}
          onClick={() => handleChangeCurrentCategory(category)}
          key={category}
        >
          {category}
        </button>
      ))}

      <button className={styles.addBtn} onClick={() => setCategoryShowModal(true)}>
        Новая категория
      </button>

      <Portal
        showModal={showCategoryModal}
        content={<AddNewCategoryModal onClose={() => setCategoryShowModal(false)} />}
      />
      <Portal
        showModal={!!currentCategory}
        content={
          <AddNewExpenseModal category={currentCategory} onClose={() => setCurrentCategory('')} />
        }
      />
    </div>
  );
};
