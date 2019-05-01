import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAddressBook,
  faEdit,
  faExclamationSquare,
  faExclamationTriangle,
  faListUl,
  faPlus,
  faSignOut,
  faSortAlphaDown,
  faSortAlphaUp,
  faSpinner,
  faUpload
} from '@fortawesome/pro-regular-svg-icons'
import configureStore from 'config/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'styles/main.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

library.add(
  faSpinner,
  faAddressBook,
  faUpload,
  faListUl,
  faPlus,
  faSignOut,
  faEdit,
  faSortAlphaUp,
  faSortAlphaDown,
  faExclamationSquare,
  faExclamationTriangle
)

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
