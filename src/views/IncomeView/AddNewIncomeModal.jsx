import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewIncome } from '../../redux-store/reducers/incomeReducer';
import { BaseModal } from '../../components/baseModal/BaseModal';
import { SubmitButton } from '../../components/btns/SubmitButton';
import { CustomInput } from '../../components/Form/CustomInput';

import styles from './modal.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('Это поля обязательное'),
  price: yup.number().required('Это поля обязательное').typeError('Сумма должна быть число'),
});

export const AddNewIncomeModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [date, setDate] = useState(new Date(Date.now()));

  const submit = (data) => {
    const milliseconds = new Date(moment(data.date)).getTime();
    dispatch(addNewIncome({ ...data, date: milliseconds }));
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
    <BaseModal title="Новый доход" onClose={onClose}>
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
        <SubmitButton>Добавить</SubmitButton>
      </form>
    </BaseModal>
  );
};
