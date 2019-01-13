import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LoadingScreen = () => (
  <div className="flex justify-center items-center bg-blue min-vh-100">
    <FontAwesomeIcon
      icon={['far', 'spinner']}
      spin
      size={'7x'}
      className="white"
    />
  </div>
)

export default LoadingScreen
