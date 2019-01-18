import React, { Component } from 'react'

class ContactCell extends Component {
  state = {
    updating: false,
    value: '',
    newValue: ''
  }

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  switchToEdit = () => {
    const { value } = this.props
    this.setState(
      {
        updating: true,
        value,
        newValue: value
      },
      () => this.inputRef.current.focus()
    )
  }

  updateValue = newValue => {
    this.setState({
      updating: true,
      value: newValue,
      newValue
    })
  }

  cancelEditing = () => {
    const { value, newValue } = this.state

    this.setState({
      updating: false,
      value,
      newValue
    })
  }
}

export default ContactCell
