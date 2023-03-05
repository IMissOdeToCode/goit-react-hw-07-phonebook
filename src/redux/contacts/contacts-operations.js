import * as api from 'services/api-contacts';
import {
  fetchAllContactsLoading,
  fetchAllContactsSuccess,
  fetchAllContactsError,
  //
  fetchAddContactLoading,
  fetchAddContactSuccess,
  fetchAddContactError,
  //
  fetchDeleteContactLoading,
  fetchDeleteContactSuccess,
  fetchDeleteContactError,
} from './contacts-actions';

import Notiflix from 'notiflix';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(fetchAllContactsLoading());
      const data = await api.getAllContacts();
      dispatch(fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(fetchAllContactsError(response.data.message));
    }
  };
  return func;
};

const isDublicate = (contacts, { name }) => {
  const normalizedName = name.toLowerCase();
  const q = contacts.items.find(({ name }) => {
    return name.toLowerCase() === normalizedName;
  });

  return Boolean(q);
};

export const fetchAddContact = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDublicate(contacts, data)) {
        Notiflix.Notify.failure(`Contact ${data.name} already exists`);
        return false;
      }

      dispatch(fetchAddContactLoading());
      const result = await api.addContact(data);
      dispatch(fetchAddContactSuccess(result));
    } catch ({ response }) {
      dispatch(fetchAddContactError(response.data.message));
    }
  };
  return func;
};

export const fetchDeleteContact = id => {
  const func = async dispatch => {
    try {
      dispatch(fetchDeleteContactLoading());
      await api.deleteContact(id);
      dispatch(fetchDeleteContactSuccess(id));
    } catch ({ response }) {
      dispatch(fetchDeleteContactError(response.data.message));
    }
  };
  return func;
};
