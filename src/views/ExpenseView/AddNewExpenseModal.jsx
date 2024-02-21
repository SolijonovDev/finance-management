import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { addNewExpense } from '../../redux-store/reducers/expenseReducer';
import { BaseModal } from '../../components/baseModal/BaseModal';
import { SubmitButton } from '../../components/btns/SubmitButton';
import { CustomInput } from '../../components/Form/CustomInput';

import styles from './modal.module.scss';

const schema = yup.object().shape({
  price: yup.number().required('Это поля обязательное').typeError('Сумма должна быть число'),
});
import moment from 'moment';
export const AddNewExpenseModal = ({ onClose, category }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(Date.now()));
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = (data) => {
    const milliseconds = new Date(moment(data.date)).getTime();

    dispatch(addNewExpense({ price: data.price, date: milliseconds, category }));
    reset();
    onClose();
  };

  const handleChange = (dateChange) => {
    setValue('date', dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };

  return (
    <BaseModal title="Новый расход" onClose={onClose}>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <h4>Категория: {category}</h4>
        <CustomInput
          label="Сумма"
          register={register}
          name="price"
          placeholder="Сумма"
          errors={errors.price}
          autoFocus
        />
        <Controller
          name="date"
          control={control}
          defaultValue={date}
          render={() => (
            <DatePicker
              dateFormat="MMMM d, yyyy"
              selected={date}
              placeholderText="Выберите дату"
              onChange={handleChange}
              wrapperClassName="datePicker"
            />
          )}
        />
        <SubmitButton>Добавить</SubmitButton>
      </form>
    </BaseModal>
  );
};
