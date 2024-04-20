import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { addLead } from '../../api';
import { useState } from 'react';

const leadShema = yup.object().shape({
    fio: yup
        .string('Допускаются только буквы')
        .required('Поле обязательно для заполнения'),
    phone: yup
        .string('Допускаются только цифры')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Телефон введен не корректно')
        .max(11, 'Телефон введен не корректно')
        .required('Поле обязательно для заполнения'),
    problem: yup
        .string('Допускаются только буквы')
        .required('Поле обязательно для заполнения'),
});

const FormContainer = ({ className }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fio: '',
            phone: '',
            problem: '',
        },
        resolver: yupResolver(leadShema),
    });
    const onSubmit = (data) => {
        addLead(data).then(({ error, message }) => {
            if (error) {
                setError(error);
                return;
            }
            setError('');
            setMessage(message);
        });
        reset();
    };

    return (
        <div className={className}>
            <div>
                <h2>Записаться ко врачу</h2>
            </div>
            {error && (
                <div
                    className="errorMessage"
                    style={{ color: 'white', background: 'red' }}
                >
                    {error}
                </div>
            )}
            {message && (
                <div
                    className="errorMessage"
                    style={{ color: 'white', background: 'green' }}
                >
                    {message}
                </div>
            )}

            <div className="form-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-fio">
                        <div style={{ color: 'red' }}>
                            {errors?.fio?.message}
                        </div>
                        <input
                            type="text"
                            id="form-fio"
                            placeholder="Введите ФИО"
                            {...register('fio')}
                        />
                    </div>
                    <div className="form-phone">
                        <div style={{ color: 'red' }}>
                            {errors?.phone?.message}
                        </div>
                        <input
                            type="text"
                            id="form-phone"
                            placeholder="Введите Телефон"
                            {...register('phone')}
                        />
                    </div>
                    <div className="form-email">
                        <div style={{ color: 'red' }}>
                            {errors?.problem?.message}
                        </div>
                        <textarea
                            type="text"
                            placeholder="Опишите вашу проблему"
                            {...register('problem')}
                        />
                    </div>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export const Form = styled(FormContainer)`
    text-align: center;
    & .form-block {
        width: 500px;
        margin: auto;
        border: 1px solid gray;
        border-radius: 13px;
        padding: 10px;
    }
    & input {
        width: 100%;
        margin: 15px 0;
        padding: 10px;
        height: 25px;
        border-radius: 6px;
        border: 1px solid gray;
    }
    & textarea {
        width: 100%;
        border-radius: 12px;
        margin: 15px 0;
    }
    & .errorMessage {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
