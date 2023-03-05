import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://640470e280d9c5c7bac7d9b5.mockapi.io/api/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  // console.log(data);
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
