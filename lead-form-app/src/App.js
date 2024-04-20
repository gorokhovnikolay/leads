import styled from 'styled-components';
import { Form, Header, Leads, Login, Register } from './components';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { TokenContext } from './context';

const AppContainer = ({ className }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <div className={className}>
                <Header />
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/leads" element={<Leads />} />
                </Routes>
            </div>
        </TokenContext.Provider>
    );
};

export const App = styled(AppContainer)`
    width: 1000px;
    margin: 0 auto;
    height: 100%;
`;
