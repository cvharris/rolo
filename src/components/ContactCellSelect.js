import { db } from 'config/firebase'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { getTypeAheadOptions } from 'reducers/contactsReducer'
import { mapRefToTypeAheadOption } from 'reducers/currentContactReducer'

class ContactCellSelect extends Component {
  state = {
    updating: false,
    newValue: ''
  }

  constructor(props) {
    super(props)
    this.selectList = React.createRef()
  }

  switchToEdit = () => {
    const { value } = this.props
    this.setState(
      {
        updating: true,
        newValue: value
      },
      () => this.selectList.current.focus()
    )
  }

  cancelEditing = () => {
    const { newValue } = this.state

    this.setState({
      updating: false,
      newValue
    })
  }

  createContactRef = id => db.doc(`contacts/${id}`)

  saveEditedValue = option => {
    const { onFieldChange, options, multiSelect } = this.props

    onFieldChange(
      options
        ? option
        : multiSelect
        ? option
          ? option.map(opt => this.createContactRef(opt.value))
          : []
        : option
        ? this.createContactRef(option.value)
        : null
    )
    this.setState({
      updating: true,
      newValue: option
    })
  }

  render() {
    const { updating, newValue } = this.state
    const { value, typeAheadOptions, multiSelect, options } = this.props

    if (updating) {
      return (
        <span className="contact-col pl3 flex-auto f6 black-70">
          <Select
            options={typeAheadOptions}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            isClearable={!options}
            ref={this.selectList}
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
        {options
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
  options: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}

ContactCellSelect.defaultProps = {
  multiSelect: false,
  options: undefined
}

export default connect((state, ownProps) => ({
  value: ownProps.options
    ? ownProps.field
    : ownProps.multiSelect
    ? ownProps.field.map(doc =>
        mapRefToTypeAheadOption(doc, state.contacts.byId)
      )
    : mapRefToTypeAheadOption(ownProps.field, state.contacts.byId),
  typeAheadOptions: ownProps.options || getTypeAheadOptions(state)
}))(ContactCellSelect)
