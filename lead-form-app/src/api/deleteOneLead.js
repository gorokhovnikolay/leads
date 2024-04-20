export const deleteOneLead = (id, token) => {
    return fetch(`http://localhost:3003/leads/${id}`, {
        method: 'DELETE',
        headers: {
            Autorization: token,
        },
    }).then((data) => data.json());
};
