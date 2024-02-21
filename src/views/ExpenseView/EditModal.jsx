import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { changeExpense } from '../../redux-store/reducers/expenseReducer';
import { BaseModal } from '../../components/baseModal/BaseModal';
import { SubmitButton } from '../../components/btns/SubmitButton';
import { CustomInput } from '../../components/Form/CustomInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import styles from './modal.module.scss';

const schema = yup.object().shape({
  price: yup.number().required('Это поля обязательное').typeError('Сумма должна быть число'),
});

export const EditModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.expense.expenses.find((income) => income.id === id));
  const [date, setDate] = useState(new Date(income.date));
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: income.price,
    },
  });

  const submit = (data) => {
    const milliseconds = new Date(moment(data.date)).getTime();

    dispatch(changeExpense({ date: milliseconds, price: data.price, id }));
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
    <BaseModal title="Изменить" onClose={onClose}>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <h4>Категория: {income.category}</h4>
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
        <SubmitButton>Сохранить</SubmitButton>
      </form>
    </BaseModal>
  );
};
