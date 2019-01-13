import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <header className="bg-navy w-100 ph3 pv3 pv4-ns ph4-m ph5-l avenir flex justify-between items-center">
        <h1 className="f2 white mr3">
          <FontAwesomeIcon icon={['far', 'address-book']} /> Rolo
        </h1>
        <nav className="f3 fw6">
          <NavLink to="/">
            <span className="link dim white dib mr3 hover-light-gray">
              <FontAwesomeIcon icon={['far', 'list-ul']} /> List
            </span>
          </NavLink>
          <NavLink to="/new-contact">
            <span className="link dim white dib mr3 hover-light-gray min">
              <FontAwesomeIcon icon={['far', 'plus']} /> Add
            </span>
          </NavLink>
          <NavLink to="/upload-contacts">
            <span className="link dim white dib mr3 hover-light-gray">
              <FontAwesomeIcon icon={['far', 'upload']} /> Upload
            </span>
          </NavLink>
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
