import { Component } from 'react';
import { Section } from './Section';
import { Form } from './Form';
import { Filter } from './Filter';
import { Contacts } from './Contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const contacts = JSON.parse(savedContacts);
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = newContact => {
    if (this.state.contacts !== null) {
      this.setState(state => ({ contacts: [...state.contacts, newContact] }));
    } else {
      this.setState({ contacts: [newContact] });
    }
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
    if (this.state.contacts !== null) {
      return this.state.contacts.filter(contact =>
        contact.name
          .toLowerCase()
          .includes(this.state.filter.toLocaleLowerCase())
      );
    }
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
