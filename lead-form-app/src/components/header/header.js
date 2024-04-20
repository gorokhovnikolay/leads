import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TokenContext } from '../../context';

const HeaderContainer = ({ className }) => {
    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className={className}>
            <div>
                <Link to="/">На главную</Link>
            </div>
            {token && (
                <div>
                    <Link to="/leads">Все заявки</Link>
                </div>
            )}
            {!token && (
                <div>
                    <Link to="/login">Вход</Link>
                </div>
            )}
            {token && (
                <div style={{ cursor: 'pointer' }} onClick={logout}>
                    Выход
                </div>
            )}
        </div>
    );
};

export const Header = styled(HeaderContainer)`
    height: 50px;
    border-bottom: 1px solid gray;
    margin-bottom: 15px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
