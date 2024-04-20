import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { login } from '../../api/login';
import { useContext, useState } from 'react';
import { TokenContext } from '../../context';

const leadShema = yup.object().shape({
    email: yup.string().required(),
    password: yup
        .string()
        .required()
        .matches(
            /^\w/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
});

const LoginContainer = ({ className }) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { setToken } = useContext(TokenContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(leadShema),
    });
    const onSubmit = (data) => {
        login(data).then(({ message, error, token }) => {
            if (error) {
                setError(error);
                return;
            }
            setError('');
            setMessage(message);
            reset();
            setToken(token);
            localStorage.setItem('token', token);
        });
    };
    return (
        <div className={className}>
            {error ? <div>{error}</div> : <div>{message}</div>}
            <div>
                <h2>Вход</h2>
            </div>
            <div className="form-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-email">
                        <div>{errors?.email?.message}</div>
                        <input
                            type="text"
                            id="form-fio"
                            placeholder="Введите ФИО"
                            {...register('email')}
                        />
                    </div>
                    <div className="form-password">
                        <div>{errors?.password?.message}</div>
                        <input
                            type="password"
                            id="form-phone"
                            placeholder="Введите Телефон"
                            {...register('password')}
                        />
                    </div>
                    <button type="submit">Отправить</button>
                    <Link to="/register">Нет аккаунта?</Link>
                </form>
            </div>
        </div>
    );
};

export const Login = styled(LoginContainer)`
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
