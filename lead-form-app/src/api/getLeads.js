export const getLeads = async (token) => {
    const leads = await fetch('http://localhost:3003/leads', {
        headers: {
            'Content-Type': 'application/json',
            Autorization: token,
        },
    }).then((data) => data.json());
    return leads;
};
