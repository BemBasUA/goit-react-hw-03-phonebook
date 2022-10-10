import { Box } from './Box/Box';
import { Component } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Form/Filter/Filter';
import { ContactList } from './Form/ContactList/ContactList';
import shortid from 'shortid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = ({ name, number }) => {
    const contact = {
      name,
      number,
    };
    contact.id = shortid.generate();

    const contactNames = this.state.contacts.map(({ name }) => name);

    if (!contactNames.includes(contact.name)) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(contact.name + ' is already in contacts.');
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const lsContacts = localStorage.getItem('contacts');
    if (lsContacts) {
      this.setState({ contacts: JSON.parse(lsContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Box>
        <h1>Phonebook</h1>
        <Form onSubmit={this.handleSubmit}></Form>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>
        <ContactList
          data={visibleContacts}
          onClick={this.deleteContact}
        ></ContactList>
      </Box>
    );
  }
}
