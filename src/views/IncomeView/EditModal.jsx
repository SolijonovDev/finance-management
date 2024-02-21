import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeIncome } from '../../redux-store/reducers/incomeReducer';
import { BaseModal } from '../../components/baseModal/BaseModal';
import { SubmitButton } from '../../components/btns/SubmitButton';
import { CustomInput } from '../../components/Form/CustomInput';
import DatePicker from 'react-datepicker';

import styles from './modalContent.module.scss';
import { useState } from 'react';
import moment from 'moment';

const schema = yup.object().shape({
  text: yup.string().required('Это поля обязательное'),
  price: yup.number().required('Это поля обязательное').typeError('Сумма должна быть число'),
});

export const EditModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.incomes.find((income) => income.id === id));
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
      text: income.text,
    },
  });

  const submit = (data) => {
    const milliseconds = new Date(moment(data.date)).getTime();
    dispatch(changeIncome({ ...data, date: milliseconds, id }));
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
        <CustomInput
          label="Откуда"
          register={register}
          name="text"
          placeholder="Откуда"
          errors={errors.text}
          autoFocus
        />
        <CustomInput
          label="Сумма"
          register={register}
          name="price"
          placeholder="Сумма"
          errors={errors.price}
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
