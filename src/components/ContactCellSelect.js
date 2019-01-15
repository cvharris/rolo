import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { getTypeAheadOptions } from 'reducers/contactsReducer'

class ContactCellSelect extends Component {
  state = {
    updating: false,
    newValue: ''
  }

  switchToEdit = () => {
    const { field } = this.props
    this.setState({
      updating: true,
      newValue: field
    })
  }

  cancelEditing = () => {
    const { newValue } = this.state

    this.setState({
      updating: false,
      newValue
    })
  }

  saveEditedValue = () => {
    const { newValue } = this.state
    const { onFieldChange } = this.props

    onFieldChange(newValue)
    this.setState({
      updating: false,
      newValue
    })
  }

  render() {
    const { updating, newValue } = this.state
    const { field, typeAheadOptions, multiSelect } = this.props

    if (updating) {
      return (
        <span className="contact-col pl3 flex-auto f6 black-70">
          <Select
            options={typeAheadOptions}
            value={newValue}
            onChange={option => this.saveEditedValue(option)}
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
        {multiSelect ? field.join(', ') : field}
      </span>
    )
  }
}

ContactCellSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multiSelect: PropTypes.bool,
  options: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellSelect.defaultProps = {
  multiSelect: false,
  options: undefined
}

export default connect((state, ownProps) => ({
  typeAheadOptions: ownProps.options || getTypeAheadOptions(state)
}))(ContactCellSelect)
