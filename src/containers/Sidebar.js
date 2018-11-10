import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l flex items-center avenir">
        <h1 className="f4 white mr3">Rolo</h1>
        <nav className="f6 fw6 tracked">
          <NavLink to="/">
            <span className="link dim white dib mr3">List</span>
          </NavLink>
          <NavLink to="/new-contact">
            <span className="link dim white dib mr3">Add</span>
          </NavLink>
          <NavLink to="/upload-contacts">
            <span className="link dim white dib">Upload</span>
          </NavLink>
        </nav>
      </header>
    )
  }
}

export default connect(state => ({}))(Sidebar)
