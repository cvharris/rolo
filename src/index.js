import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAddressBook,
  faListUl,
  faPlus,
  faSignOut,
  faSpinner,
  faUpload
} from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import './index.css'
import * as serviceWorker from './serviceWorker'

library.add(faSpinner, faAddressBook, faUpload, faListUl, faPlus, faSignOut)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
