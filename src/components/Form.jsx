import { Component } from 'react';
import { nanoid } from 'nanoid';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const name = this.state.name;

    if (this.props.contacts !== null) {
      if (
        this.props.contacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        return alert(`Contact ${name} already here`);
      }
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onSubmit(newContact);
    this.setState({ name: '', number: '' });
    ev.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[\p{L}]+(([' \-][\p{L} ])?[\p{L}]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input onChange={this.handleChange} name="number" type="tel"></input>
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
