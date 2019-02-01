import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Sidebar extends Component {
  render() {
    return (
      <header className="bg-navy w-100 ph3 pv3 pv4-ns ph4-m ph5-l avenir flex justify-between items-center">
        <h1 className="f2 white mr3">
          <FontAwesomeIcon icon={['far', 'address-book']} /> Rolo
        </h1>
        <nav className="f3 fw6">
          <Link to="/">
            <span className="link dim white dib mr3 hover-light-gray">
              <FontAwesomeIcon icon={['far', 'list-ul']} /> List
            </span>
          </Link>
          <Link to="new-contact">
            <span className="link dim white dib mr3 hover-light-gray min">
              <FontAwesomeIcon icon={['far', 'plus']} /> Add
            </span>
          </Link>
          <Link to="upload-contacts">
            <span className="link dim white dib mr3 hover-light-gray">
              <FontAwesomeIcon icon={['far', 'upload']} /> Upload
            </span>
          </Link>
          <div
            className="link dim white dib hover-light-gray pointer"
            onClick={this.props.handleLogout}
          >
            <FontAwesomeIcon icon={['far', 'sign-out']} /> Logout
          </div>
        </nav>
      </header>
    )
  }
}

export default connect(state => ({}))(Sidebar)
