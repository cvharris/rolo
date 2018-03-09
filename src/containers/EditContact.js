import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import { connect } from 'react-redux';
import { updateContactName, updateContact } from '../actions/currentContactActions';

class EditContact extends Component {
  render() {
    return (
      <ContactForm contact={this.props.contact} onNameUpdate={this.props.updateCurrentContactName} onContactSubmit={this.props.addContact} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentContactName: (name) => {
      dispatch(updateContactName(name))
    },
    updateContact: (newContact) => {
      dispatch(updateContact(newContact))
    }
  }
}

export default connect((state) => ({
  contact: state.currentContact
}), mapDispatchToProps)(EditContact)