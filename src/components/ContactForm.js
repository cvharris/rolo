import React, { Component } from "react";

export default class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      number: ''
    }
  }

  render() {
    const { newContact, onNameUpdate, onContactSubmit } = this.props
    return (
      <div className="contact-form">
        <header className="tc pv4 pv5-ns">
          <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
          <h1 className="f5 f4-ns fw6 mid-gray">{newContact.name ? newContact.name : 'New Contact'}</h1>
          {/* <h2 className="f6 gray fw2 ttu tracked">Los Angeles</h2> */}
        </header>
        <div className="measure center">
          <form className="pa4 black-80" onSubmit={(e) => {
            e.preventDefault()
            onContactSubmit(newContact)
          }}>
            <label htmlFor="name" className="f6 b db mb2">Name</label>
            <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={newContact.name} onChange={(e) => onNameUpdate(e.target.value)} />
          </form>
        </div>
      </div>
    )
  }
}

