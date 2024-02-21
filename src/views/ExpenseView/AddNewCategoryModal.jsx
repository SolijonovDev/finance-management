import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewCategory } from '../../redux-store/reducers/expenseReducer';
import { BaseModal } from '../../components/baseModal/BaseModal';
import { CustomInput } from '../../components/Form/CustomInput';
import { SubmitButton } from '../../components/btns/SubmitButton';

import styles from './addNewCategoryModal.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('Это поля обязательное'),
});

export const AddNewCategoryModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = (data) => {
    dispatch(addNewCategory(data.text));
    reset();
    onClose();
  };

  return (
    <BaseModal title="Новая категория" onClose={onClose}>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <CustomInput
          label="Новая категория"
          register={register}
          name="text"
          placeholder="Новая категория"
          errors={errors.text}
          autoFocus
        />
        <SubmitButton>Добавить</SubmitButton>
      </form>
    </BaseModal>
  );
};
