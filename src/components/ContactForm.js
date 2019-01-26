import Contact from 'lib/Contact'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { getTypeAheadOptions } from 'reducers/contactsReducer'

class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = props.contact
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelectChange = (option, name) => {
    this.setState({
      [name]: option
    })
  }

  onSubmit = e => {
    this.props.onContactSubmit(this.state)
    e.preventDefault()
  }

  render() {
    const { submitButtonText } = this.props
    const { firstName, lastName } = this.state
    return (
      <div className="contact-form">
        <header className="tc pv2 pv5-ns">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 pa1 ba b--black-10 h3 w3"
            alt="avatar"
          />
          <h1 className="f5 f4-ns fw6 mid-gray">
            {firstName || lastName ? `${firstName} ${lastName}` : 'New Contact'}
          </h1>
          {this.state.company && (
            <h2 className="f6 gray fw2 ttu tracked">{this.state.company}</h2>
          )}
        </header>
        <div className="measure center">
          <form className="pa4 black-80" onSubmit={this.onSubmit}>
            <label htmlFor="firstName" className="f6 b db mb2">
              First Name
              <input
                id="firstName"
                className="input-reset ba b--black-20 pa2 mb3 db w-100"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="middleName" className="f6 b db mb2">
              Middle Name
              <input
                id="middleName"
                className="input-reset ba b--black-20 pa2 mb3 db w-100"
                type="text"
                name="middleName"
                value={this.state.middleName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="maidenName" className="f6 b db mb2">
              Maiden Name (If Applicable)
              <input
                id="maidenName"
                className="input-reset ba b--black-20 pa2 mb3 db w-100"
                type="text"
                name="maidenName"
                value={this.state.maidenName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="lastName" className="f6 b db mb2">
              Last Name
              <input
                id="lastName"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="prefix" className="f6 b db mb2">
              Prefix
              <input
                id="prefix"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="text"
                name="prefix"
                value={this.state.prefix}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="suffix" className="f6 b db mb2">
              Suffix
              <input
                id="suffix"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="text"
                name="suffix"
                value={this.state.suffix}
                onChange={this.handleInputChange}
              />
            </label>

            <label htmlFor="gender" className="f6 b db mb2">
              Gender
              <select
                id="gender"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                name="gender"
                value={this.state.gender}
                onChange={this.handleInputChange}
              >
                <option value="">--</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </label>

            <label htmlFor="phoneNumbers" className="f6 b db mb2">
              Phone Numbers
              <input
                id="phoneNumbers"
                className="input-reset ba b--black-20 pa2 mb3 db w-100"
                type="tel"
                name="phoneNumbers"
                value={this.state.phoneNumbers || ''}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="email" className="f6 b db mb2">
              E-Mail Address
              <input
                id="email"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="address" className="f6 b db mb2">
              Home Address
              <input
                id="address"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="text"
                name="address"
                value={this.state.address || ''}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="birthday" className="f6 b db mb2">
              Birthday
              <input
                id="birthday"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="date"
                name="birthday"
                value={this.state.birthday || ''}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="dod" className="f6 b db mb2">
              Date of Death
              <input
                id="dod"
                className="input-reset ba b--black-20 pa2 mb4 db w-100"
                type="date"
                name="dod"
                value={this.state.dod || ''}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="f6 b db mt2">Spouse</label>
            <Select
              options={this.props.typeAheadOptions}
              value={this.state.spouse}
              onChange={option => this.handleSelectChange(option, 'spouse')}
              name="spouse"
            />
            <label className="f6 b db mt2">Children</label>
            <Select
              options={this.props.typeAheadOptions}
              value={this.state.children}
              onChange={option => this.handleSelectChange(option, 'children')}
              name="children"
              isMulti={true}
            />

            <label className="f6 b db mt2">Parents</label>
            <Select
              options={this.props.typeAheadOptions}
              value={this.state.parents}
              onChange={option => this.handleSelectChange(option, 'parents')}
              name="parents"
              isMulti={true}
            />

            <button
              type="submit"
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue"
            >
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

ContactForm.propTypes = {
  contact: PropTypes.instanceOf(Contact),
  onContactSubmit: PropTypes.func,
  typeAheadOptions: PropTypes.array,
  submitButtonText: PropTypes.string
}

export default connect(state => ({
  typeAheadOptions: getTypeAheadOptions(state)
}))(ContactForm)
