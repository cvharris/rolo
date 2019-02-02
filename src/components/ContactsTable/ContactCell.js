import React, { Component } from 'react'

class ContactCell extends Component {
  state = {
    updating: false,
    newValue: ''
  }

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  switchToEdit = () => {
    const { field } = this.props

    this.setState(
      {
        updating: true,
        newValue: field
      },
      () => this.inputRef.current.focus()
    )
  }

  updateValue = newValue => {
    this.setState({
      updating: true,
      newValue
    })
  }

  cancelEditing = () => {
    const { newValue } = this.state

    this.setState({
      updating: false,
      newValue
    })
  }
}

export default ContactCell
