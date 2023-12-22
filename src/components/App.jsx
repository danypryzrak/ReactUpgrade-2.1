import { Component } from 'react';
import { Section } from './Section';
import { Form } from './Form';
import { Filter } from './Filter';
import { Contacts } from './Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    this.setState(state => ({ contacts: [...state.contacts, newContact] }));
  };

  deleteContact = name => {
    this.setState(state => {
      return {
        contacts: state.contacts.filter(contact => contact.name !== name),
      };
    });
  };

  handleFilter = ev => {
    const filterValue = ev.target.value;
    this.setState({ filter: filterValue });
  };

  showFiltered = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };

  render() {
    const initialFilter = this.state.filter;
    return (
      <div>
        <Section title="Phone Book">
          <Form onSubmit={this.addContact} contacts={this.state.contacts} />
        </Section>
        <Section title="Contacts">
          <Filter
            initialFilter={initialFilter}
            handleFilter={this.handleFilter}
          />
          <Contacts
            showFiltered={this.showFiltered}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
