import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import './index.css'
import RoloApp from './RoloApp'
import registerServiceWorker from './registerServiceWorker'

fontawesome.library.add(solid)

class App extends Component {
  openPopup = () => {
    // const derp = window.open('', 'NAMLogin', 'height=200,width=400,menubar=no,toolbar=no,location=no')
    const derp = window.open('', 'NAMLogin', 'height=200,width=400,menubar=no,toolbar=no,location=no')
    setTimeout(() => {
      derp.close()
    }, 2000);
  }

  render() {
    return (
      <span onClick={this.openPopup}>Click me!</span>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
