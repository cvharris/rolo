import React from 'react'
import ReactDOM from 'react-dom'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import './index.css'
import RoloApp from './RoloApp'
import registerServiceWorker from './registerServiceWorker'

fontawesome.library.add(solid)

ReactDOM.render(<RoloApp />, document.getElementById('root'))
registerServiceWorker()
