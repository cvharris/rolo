import { db } from 'config/firebase'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { mapRefToTypeAheadOption } from 'reducers/currentContactReducer'
import ContactCell from './ContactCell'

class ContactCellSelect extends ContactCell {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      value: !props.isContactSelect
        ? props.field
        : props.multiSelect
        ? props.field.map(doc =>
            mapRefToTypeAheadOption(doc, props.contactsMap)
          )
        : mapRefToTypeAheadOption(props.field, props.contactsMap)
    }
  }

  createContactRef = id => db.doc(`contacts/${id}`)

  saveEditedValue = option => {
    const { onFieldChange, isContactSelect, multiSelect } = this.props

    onFieldChange(
      !isContactSelect
        ? option.value
        : multiSelect
        ? option
          ? option.map(opt => this.createContactRef(opt.value))
          : []
        : option
        ? this.createContactRef(option.value)
        : null
    )
    this.updateValue(option)
  }

  render() {
    const { updating, value, newValue } = this.state
    const { isContactSelect, multiSelect, options } = this.props

    if (updating) {
      return (
        <span className="contact-col pl3 flex-auto f6 black-70">
          <Select
            options={options}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            isClearable={!options}
            ref={this.inputRef}
            value={newValue}
            onKeyDown={e => (e.key === 'Enter' ? this.cancelEditing() : null)}
            onChange={option => this.saveEditedValue(option)}
            onBlur={this.cancelEditing}
            isMulti={multiSelect}
          />
        </span>
      )
    }

    return (
      <span
        onClick={this.switchToEdit}
        className="contact-col pointer underline-hover pl3 flex-auto f6 black-70"
      >
        {!isContactSelect
          ? value
          : multiSelect
          ? value.map(fi => fi.label).join(', ')
          : value.label}
      </span>
    )
  }
}

ContactCellSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multiSelect: PropTypes.bool,
  isContactSelect: PropTypes.bool.isRequired,
  contactsMap: PropTypes.object,
  options: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellSelect.defaultProps = {
  multiSelect: false,
  options: undefined
}

export default ContactCellSelect
