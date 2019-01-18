import { db } from 'config/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import ContactCell from './ContactCell';

class ContactCellContactSelect extends ContactCell {
  createContactRef = id => db.doc(`contacts/${id}`)

  saveEditedValue = option => {
    const { onFieldChange, multiSelect } = this.props

    const newVal = multiSelect ? option ? option.map(opt => this.createContactRef(opt.value)) : [] : option ? this.createContactRef(option.value) : null

    onFieldChange(newVal)

    this.updateValue(option)
  }

  render() {
    const { updating, newValue } = this.state
    const { multiSelect, field, options } = this.props

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
        {multiSelect
          ? field.map(fi => fi.label).join(', ')
          : field.label}
      </span>
    )
  }
}

ContactCellContactSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multiSelect: PropTypes.bool,
  options: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellContactSelect.defaultProps = {
  multiSelect: false,
  options: undefined
}

export default ContactCellContactSelect
