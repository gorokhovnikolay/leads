import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLeads } from '../../api/getLeads';
import { TokenContext } from '../../context';
import { deleteOneLead } from '../../api';

const LeadsContainer = ({ className }) => {
    const { token } = useContext(TokenContext);
    const [leads, setLeads] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        getLeads(token).then(({ error, leads }) => {
            if (error) {
                setError(error);
                return;
            }
            setLeads(leads);
        });
    }, [token, refresh]);

    const deleteLead = (id) => {
        deleteOneLead(id, token).then(({ error, message }) => {
            if (error) {
                console.log(error);
            }
            console.log(message);
            setrefresh((prev) => !prev);
        });
    };
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={className}>
            <div className="header row">
                <div>Дата</div>
                <div>ФИО</div>
                <div>Телефон</div>
                <div>Проблема</div>
                <button disabled={true}>x</button>
            </div>
            {leads.map((lead) => {
                return (
                    <div key={lead.id} className="row">
                        <div>{lead.data}</div>
                        <div>{lead.fio}</div>
                        <div>{lead.phone}</div>
                        <div>{lead.problem}</div>
                        <button onClick={() => deleteLead(lead.id)}>x</button>
                    </div>
                );
            })}
        </div>
    );
};

export const Leads = styled(LeadsContainer)`
    width: 800px;
    margin: auto;
    & .row {
        display: flex;
        justify-content: space-between;
    }
    & .row div {
        width: 100%;
        text-align: left;
        border: 1px solid gray;
        padding: 5px;
    }
`;
