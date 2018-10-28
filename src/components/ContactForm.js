import React, { Component } from 'react'

export default class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = props.contact
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    this.props.onContactSubmit(this.state)
    e.preventDefault()
  }

  render() {
    return (
      <div className="contact-form">
        <header className="tc pv4 pv5-ns">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 pa1 ba b--black-10 h3 w3"
            alt="avatar"
          />
          <h1 className="f5 f4-ns fw6 mid-gray">
            {this.state.firstName || this.state.lastName
              ? `${this.state.firstName} ${this.state.lastName}`
              : 'New Contact'}
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
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="lastName" className="f6 b db mb2">
              Last Name
              <input
                id="lastName"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </label>
            <label htmlFor="company" className="f6 b db mb2">
              Company
              <input
                id="company"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                name="company"
                value={this.state.company}
                onChange={this.handleInputChange}
              />
            </label>
            <button
              type="submit"
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}
