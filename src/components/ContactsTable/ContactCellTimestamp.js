import firebase from 'config/firebase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ContactCell from './ContactCell'

class ContactCellTimestamp extends ContactCell {
  saveEditedValue = () => {
    const { newValue } = this.state
    const { onFieldChange } = this.props

    onFieldChange(firebase.firestore.Timestamp.fromDate(new Date(newValue)))
    this.cancelEditing()
  }

  render() {
    const { updating, newValue } = this.state
    const { value } = this.props

    if (updating) {
      return (
        <span
          className="contact-col pl3 flex-auto f6 black-70"
          onClick={this.cancelEditing}
        >
          <input
            onClick={e => e.stopPropagation()}
            type="date"
            value={newValue}
            ref={this.inputRef}
            onBlur={this.cancelEditing}
            onChange={e => this.updateValue(e.target.value)}
            onKeyUp={e => (e.key === 'Enter' ? this.saveEditedValue() : null)}
          />
        </span>
      )
    }

    return (
      <span
        onClick={this.switchToEdit}
        className="contact-col pl3 flex-auto f6 pointer black-70"
      >
        {value}
      </span>
    )
  }
}

ContactCellTimestamp.propTypes = {
  field: PropTypes.object,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellTimestamp.defaultProps = {
  field: ''
}

export default connect((state, ownProps) => ({
  value: ownProps.field
    ? ownProps.field
        .toDate()
        .toISOString()
        .slice(0, 10)
    : ''
}))(ContactCellTimestamp)
