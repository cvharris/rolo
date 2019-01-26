import React, { Component } from 'react'
import firebase from '../config/firebase'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  signIn = async e => {
    e.preventDefault()
    const { handleLogin } = this.props
    const { email, password } = this.state

    try {
      const success = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      handleLogin(success)
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        errorMessage: e.message
      }))
    }
  }

  clearErrorMessage = () => {
    const { errorMessage } = this.state
    if (errorMessage) {
      this.setState(prevState => ({
        ...prevState,
        errorMessage: ''
      }))
    }
  }

  updateInput = (field, value) => {
    this.setState(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  render() {
    const { email, password, errorMessage } = this.state

    return (
      <div className="bg-blue min-vh-100 overflow-auto flex justify-center items-center">
        <div className="measure-wide w-100 tc center mv4 bg-white br3 pa3 pa4-ns ba b--black-10">
          <h1 className="f1 mt0">Rolo</h1>
          <h3 className="f-2">The family contact app</h3>
          <p>{errorMessage}</p>
          <form onSubmit={this.signIn} className="login-form">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0 fw6 clip">Login</legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="email-address">
                  Email address
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent tc w-100 measure"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={email}
                  onChange={e => this.updateInput('email', e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent tc"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={e => this.updateInput('password', e.target.value)}
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
