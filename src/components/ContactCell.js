import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ContactCell extends Component {
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

  updateValue = e => {
    this.setState({
      updating: true,
      newValue: e.target.value
    })
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
            value={newValue}
            onBlur={this.cancelEditing}
            onChange={this.updateValue}
            onKeyUp={e => (e.key === 'Enter' ? this.saveEditedValue : null)}
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

ContactCell.propTypes = {
  field: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired
}

export default ContactCell
