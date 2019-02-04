import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import ContactCell from './ContactCell'

class ContactCellSelect extends ContactCell {
  saveEditedValue = option => {
    const { onFieldChange, multiSelect } = this.props

    onFieldChange(
      option
        ? multiSelect
          ? option.map(opt => opt.value)
          : option.value
        : null
    )
    this.updateValue(option)
  }

  render() {
    const { updating, newValue } = this.state
    const { multiSelect, field, options, children } = this.props

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
        className="contact-col pointer underline-hover pl3 flex-auto f6 black-70 relative"
      >
        {multiSelect ? field.join(', ') : field}
        {children}
      </span>
    )
  }
}

ContactCellSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multiSelect: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellSelect.defaultProps = {
  multiSelect: false
}

export default ContactCellSelect
