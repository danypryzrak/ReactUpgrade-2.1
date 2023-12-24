import { useState } from 'react';
import { nanoid } from 'nanoid';

export const Form = ({ contacts, onSubmit }) => {
  const [user, setUser] = useState({ name: '', number: '' });

  const handleChange = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    setUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const name = user.name;

    if (contacts.length > 0) {
      if (
        contacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        return alert(`Contact ${name} already here`);
      }
    }

    const newContact = {
      id: nanoid(),
      name: user.name,
      number: user.number,
    };
    onSubmit(newContact);
    setUser({ name: '', number: '' });
    ev.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[\p{L}]+(([' \-][\p{L} ])?[\p{L}]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input onChange={handleChange} name="number" type="tel"></input>
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
