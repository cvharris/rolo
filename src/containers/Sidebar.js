import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <header className="bg-navy w-100 ph3 pv3 pv4-ns ph4-m ph5-l avenir flex justify-between items-center">
        <h1 className="f2 white mr3 fa fa-address-book"> Rolo</h1>
        <nav className="f3 fw6">
          <NavLink to="/">
            <span className="link dim white dib mr3 fa fa-list-ul hover-light-gray">
              List
            </span>
          </NavLink>
          <NavLink to="/new-contact">
            <span className="link dim white dib mr3 fa fa-plus hover-light-gray min">
              Add
            </span>
          </NavLink>
          <NavLink to="/upload-contacts">
            <span className="link dim white dib fa fa-upload hover-light-gray">
              Upload
            </span>
          </NavLink>
        </nav>
      </header>
    )
  }
}

export default connect(state => ({}))(Sidebar)
