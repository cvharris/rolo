import firebase from 'config/firebase'
import PropTypes from 'prop-types'
import React from 'react'
import ContactCell from './ContactCell'

class ContactCellTimestamp extends ContactCell {
  saveEditedValue = () => {
    const { newValue } = this.state
    const { onFieldChange } = this.props

    onFieldChange(
      newValue
        ? firebase.firestore.Timestamp.fromDate(new Date(newValue))
        : null
    )
    this.cancelEditing()
  }

  render() {
    const { updating, newValue } = this.state
    const { field } = this.props

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
        {field}
      </span>
    )
  }
}

ContactCellTimestamp.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onFieldChange: PropTypes.func.isRequired
}

ContactCellTimestamp.defaultProps = {
  field: ''
}

export default ContactCellTimestamp
