import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://640470e280d9c5c7bac7d9b5.mockapi.io/api/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data: result } = await contactsInstance.delete(`/${id}`);

  return result;
};

//https://mockapi.io/projects/640470e280d9c5c7bac7d9b6
/*
[
  {
    name: 'Rosie Simpson',
    number: '459-12-56',
    id: '1',
  },
  {
    name: 'Hermione Kline',
    number: '443-89-12',
    id: '2',
  },
  {
    name: 'Eden Clements',
    number: '645-17-79',
    id: '3',
  },
  {
    name: 'Annie Copeland',
    number: '227-91-26',
    id: '4',
  },
];

*/
