import PropTypes from 'prop-types'
import React from 'react'
import ContactCell from './ContactCell'

class ContactCellText extends ContactCell {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      value: props.field
    }
  }
  saveEditedValue = () => {
    const { newValue } = this.state
    const { onFieldChange } = this.props

    onFieldChange(newValue)
    this.cancelEditing()
  }

  render() {
    const { updating, value, newValue } = this.state

    if (updating) {
      return (
        <span
          className="contact-col pl3 flex-auto f6 black-70"
          onClick={this.cancelEditing}
        >
          <input
            onClick={e => e.stopPropagation()}
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

ContactCellText.propTypes = {
  field: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellText.defaultProps = {
  field: ''
}

export default ContactCellText
