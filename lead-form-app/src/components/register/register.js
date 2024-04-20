import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { newRegister } from '../../api';
import { useState } from 'react';

const leadShema = yup.object().shape({
    email: yup.string().required(),
    password: yup
        .string()
        .required('Обязательное поле')
        .min(6, 'Минимальная длинна 6 символов')
        .max(16, 'Максимальная длинна 6 символов')
        .matches(
            /^\w/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegisterContainer = ({ className }) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(leadShema),
    });
    const onSubmit = (data) => {
        newRegister(data).then(({ error, message }) => {
            if (error) {
                setError(error);
                return;
            }
            setError('');
            setMessage(message);
            navigate('/login');
        });
    };
    return (
        <div className={className}>
            {error ? <div>{error}</div> : <div>{message}</div>}
            <div>
                <h2>Зарегистрироваться</h2>
            </div>
            <div className="form-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-email">
                        <div style={{ color: 'red' }}>
                            {errors?.email?.message}
                        </div>
                        <input
                            type="text"
                            id="form-fio"
                            placeholder="Введите email"
                            {...register('email')}
                        />
                    </div>
                    <div className="form-password">
                        <div style={{ color: 'red' }}>
                            {errors?.password?.message}
                        </div>
                        <input
                            type="password"
                            id="form-password"
                            placeholder="Введите пароль"
                            {...register('password')}
                        />
                    </div>
                    <div className="form-password">
                        <div style={{ color: 'red' }}>
                            {errors?.confirmPassword?.message}
                        </div>
                        <input
                            type="password"
                            id="form-confirm-password"
                            placeholder="Введите пароль еще раз"
                            {...register('confirmPassword')}
                        />
                    </div>
                    <button type="submit">Отправить</button>
                    <Link to="/login">Есть аккаунт</Link>
                </form>
            </div>
        </div>
    );
};

export const Register = styled(RegisterContainer)`
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
`;
