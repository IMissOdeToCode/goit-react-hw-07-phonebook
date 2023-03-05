import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactsList from '../ContactsList/ContactsList';
import ContactsFilter from '../ContactsFilter/ContactsFilter';
import ContactsForm from '../ContactsForm/ContactsForm';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from 'redux/contacts/contacts-operations';
import { setFilter } from '../../redux/filter/filter-slice';

import { getFilter, getFilteredContact } from 'redux/filter/filter-selectors';

import css from './PhoneBook.module.scss';

const PhoneBook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const allContacts = useSelector(fetchAllContacts);
  // const contacts = allContacts.items;
  const contacts = useSelector(getFilteredContact);

  const filter = useSelector(getFilter);

  const isContacts = Boolean(contacts.items.length);
  // const isContacts = true;

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={css.wrapper}>
      <div className={css.block}>
        <h1 className={css.header}>Phonebook</h1>
        <ContactsForm />
      </div>

      <div className={css.block}>
        <h2 className={css.header}>Contacts</h2>
        <ContactsFilter value={filter} handleChange={handleFilter} />
        {isContacts && <ContactsList contacts={contacts.items} />}
        {!isContacts && <p className={css.header}>No contacts in list</p>}
      </div>
    </div>
  );
};

export default PhoneBook;
