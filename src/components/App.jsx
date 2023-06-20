import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Nastya Fedorova', number: '066-44-12-87' },
      { id: 'id-2', name: 'Alina Melnichuk', number: '099-13-12-567' },
      { id: 'id-3', name: 'Lera Kuzzmina', number: '050-33-56-877' },
      { id: 'id-4', name: 'Marina Kuchina', number: '099-44-55-555' },
      { id: 'id-5', name: 'Yaroslav Kizim', number: '099-44-76-567' },
      { id: 'id-6', name: 'Taras Ivanov', number: '050-43-43-432' },
      { id: 'id-7', name: 'Artur Petrov', number: '063-22-33-444' },
    ],
    filter: '',
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleAddContact = newContact => {
    const { contacts } = this.state;
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.wraper}>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
