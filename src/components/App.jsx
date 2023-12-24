import { useEffect, useState } from 'react';
import { Section } from './Section';
import { Form } from './Form';
import { Filter } from './Filter';
import { Contacts } from './Contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('2');
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = name => {
    setContacts(state => state.filter(contact => contact.name !== name));
  };

  const handleFilter = ev => {
    const filterValue = ev.target.value;
    setFilter(filterValue);
  };

  const showFiltered = () => {
    if (contacts.length > 0) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    }
  };

  return (
    <div>
      <Section title="Phone Book">
        <Form onSubmit={addContact} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter initialFilter={filter} handleFilter={handleFilter} />
        <Contacts showFiltered={showFiltered} deleteContact={deleteContact} />
      </Section>
    </div>
  );
};
