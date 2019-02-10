import Address from 'lib/Address'
import addressParser from 'parse-address'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select/lib/Creatable'
import ContactCell from './ContactCell'

class ContactCellAddress extends ContactCell {
  saveEditedValue = option => {
    const { onFieldChange, options } = this.props

    onFieldChange(option ? option.value : null)

    this.updateValue(options.find(address => address.toHash() === option.value))
  }

  mapAddressesToOptions = addresses => {
    return addresses.map(this.mapAddressToOption)
  }

  mapAddressToOption = address => ({
    label: address.toString(),
    value: address.toHash()
  })

  onCreateAddress = label => {
    const { onAddressCreation, onFieldChange } = this.props

    const parsedAddress = addressParser.parseLocation(label)
    const newAddress = new Address({
      street1: `${parsedAddress.number}${
        parsedAddress.prefix ? ` ${parsedAddress.prefix}` : ''
      } ${parsedAddress.street}${
        parsedAddress.type ? ` ${parsedAddress.type}` : ''
      }${parsedAddress.suffix ? ` ${parsedAddress.suffix}` : ''}`,
      street2: parsedAddress.sec_unit_type
        ? `${parsedAddress.sec_unit_type} ${parsedAddress.sec_unit_num}`
        : '',
      city: parsedAddress.city,
      state: parsedAddress.state,
      zip: parsedAddress.zip
    })

    onAddressCreation(newAddress)
    const newOption = {
      label: newAddress.toString(),
      value: newAddress.toHash()
    }

    onFieldChange(newOption.value)

    return newOption
  }

  render() {
    const { updating, newValue } = this.state
    const { field, options, children } = this.props

    if (updating) {
      return (
        <span className="contact-col pl3 flex-auto f6 black-70">
          <Select
            options={this.mapAddressesToOptions(options)}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            isClearable={!options}
            ref={this.inputRef}
            value={this.mapAddressToOption(newValue)}
            onKeyDown={e => (e.key === 'Enter' ? this.cancelEditing() : null)}
            onChange={option => this.saveEditedValue(option)}
            onCreateOption={this.onCreateAddress}
            onBlur={this.cancelEditing}
          />
        </span>
      )
    }

    return (
      <span
        onClick={this.switchToEdit}
        className="contact-col pointer underline-hover pl3 flex-auto f6 black-70 relative"
      >
        {field.toString()}
        {children}
      </span>
    )
  }
}

ContactCellAddress.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellAddress.defaultProps = {
  multiSelect: false
}

export default ContactCellAddress
