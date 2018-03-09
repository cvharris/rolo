import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import { connect } from 'react-redux';
import { addContact } from '../actions/currentContactActions';
import { withRouter } from 'react-router-dom'

class AddContact extends Component {
  render() {
    return (
      <ContactForm contact={this.props.newContact} onNameUpdate={this.props.updateCurrentContactName} onContactSubmit={this.props.addContact} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (newContact) => {
      dispatch(addContact(newContact))
    }
  }
}

// @ts-ignore
export default withRouter(connect((state) => ({
  newContact: state.currentContact
}), mapDispatchToProps)(AddContact))
