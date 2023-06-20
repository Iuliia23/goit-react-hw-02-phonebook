import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Nastya Fedorova', number: '445-12-87' },
      { id: 'id-2', name: 'Alina Melnichuk', number: '135-12-56' },
      { id: 'id-3', name: 'Lera Kuzzmina', number: '336-56-87' },
      { id: 'id-4', name: 'Marina Kuchina', number: '446-55-55' },
      { id: 'id-5', name: 'Yaroslav Kizim', number: '448-76-57' },
      { id: 'id-6', name: 'Taras Ivanov', number: '439-43-43' },
      { id: 'id-7', name: 'Artur Petrov', number: '226-33-44' },
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
