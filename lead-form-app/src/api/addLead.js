export const addLead = (data) => {
    return fetch('http://localhost:3003', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((data) => data.json());
};
