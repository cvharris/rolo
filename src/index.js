import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import RoloApp from './RoloApp'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<RoloApp />, document.getElementById('root'))
registerServiceWorker()
