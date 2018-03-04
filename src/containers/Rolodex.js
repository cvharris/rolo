import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactsList from '../components/ContactsList'

class Rolodex extends Component {
  render() {
    return (
      <div>
        <ContactsList contacts={this.props.contacts} />
      </div>
    )
  }
}

export default connect(state => ({
  contacts: state.contacts.contacts
}))(Rolodex)