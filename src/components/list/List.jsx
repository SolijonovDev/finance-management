import moment from 'moment';

import styles from './list.module.scss';

export const List = ({ items, handleEdit, handleDelete, hideBtns = false }) => {
  return (
    <ul>
      {items &&
        items.map(item => {
          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.info}>
                <h2>{item.tag === 'income' ? item.text : item.category}</h2>
                <p>{item.price} сум</p>
              </div>
              <span className={styles.created_at}>{moment(item.date).format('LL')}</span>
              {!hideBtns && (
                <div className={styles.btns}>
                  <button className={styles.edit} onClick={() => handleEdit?.(item.id)}>
                    Изменить
                  </button>
                  <button className={styles.delete} onClick={() => handleDelete?.(item.id)}>
                    Удалить
                  </button>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
};
