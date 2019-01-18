import mapContactsToSelectOpts from 'lib/mapContactsToSelectOpts';
import React, { Component } from 'react';

const ContactListContext = React.createContext()
const { Provider, Consumer } = ContactListContext

class ContactListProvider extends Component {
  state = {
    contactsAllIds: [],
    contactsById: {},
    typeaheadOptions: [],
    updateContact: () => {}
  }

  updateContacts = (contactsById) => {
    this.setState(prevState => ({
      ...prevState,
      contactsById,
      typeaheadOptions: mapContactsToSelectOpts(
        prevState.contactsAllIds.map(cId => contactsById[cId])
      ) 
    }))
  }

  switchContexts = (contactsAllIds, contactsById, newUpdateFunction) => {
    this.setState({
      contactsAllIds,
      contactsById,
      typeaheadOptions: mapContactsToSelectOpts(
        contactsAllIds.map(cId => contactsById[cId])
      ),
      updateContact: newUpdateFunction
    })
  }

  render() {
    return (
      <Provider value={{ ...this.state, switchContexts: this.switchContexts, updateContacts: this.updateContacts }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { ContactListProvider, Consumer as ContactListConsumer };

export default ContactListContext

