import { createSlice } from '@reduxjs/toolkit';

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

const initialStore = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialStore,
  extraReducers: builder => {
    builder

      //FETCH ALL CONTACTS
      .addCase(fetchAllContactsLoading, store => {
        store.isLoading = true;
      })
      .addCase(fetchAllContactsSuccess, (store, { payload }) => {
        store.isLoading = false;
        store.items = payload;
      })
      .addCase(fetchAllContactsError, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })

      //ADD CONTACT
      .addCase(fetchAddContactLoading, store => {
        store.isLoading = true;
      })
      .addCase(fetchAddContactSuccess, (store, { payload }) => {
        store.isLoading = false;
        store.items.push(payload);
      })
      .addCase(fetchAddContactError, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })

      //DELETE CONTACT
      .addCase(fetchDeleteContactLoading, store => {
        store.isLoading = true;
      })
      .addCase(fetchDeleteContactSuccess, (store, { payload }) => {
        store.isLoading = false;
        const index = store.items.findIndex(item => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteContactError, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export default contactsSlice.reducer;
