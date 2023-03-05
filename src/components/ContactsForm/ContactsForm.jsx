import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddContact } from 'redux/contacts/contacts-operations';
import initialState from '../utils/initialState';

import css from './ContactsForm.module.scss';

const ContactsForm = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState(() => {
    return { ...initialState };
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const result = handleAddContact({ ...state });
    if (result) {
      reset();
    }
  };

  const reset = () => {
    setState({ ...initialState });
  };

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));

    return true;
  };

  const { name, number } = state;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputBlock}>
        <div>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <input
            className={css.input}
            id="name"
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>

        <div>
          <label className={css.label} htmlFor="number">
            Number
          </label>
          <input
            className={css.input}
            id="number"
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
      </div>

      <button className={css.addButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactsForm;
