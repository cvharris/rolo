import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

class TooltipIcon extends Component {
  state = {
    showingTooltip: false
  }

  hideTooltip = () => {
    this.setState({
      showingTooltip: false
    })
  }

  showTooltip = () => {
    this.setState({
      showingTooltip: true
    })
  }

  render() {
    const { text, position, icon, color } = this.props
    const { showingTooltip } = this.state

    return (
      <span className="tooltip-icon relative" onMouseLeave={this.hideTooltip}>
        {showingTooltip && (
          <div className={`tooltip-bubble tooltip-${position}`}>
            <div className="tooltip-message">{text}</div>
          </div>
        )}
        <FontAwesomeIcon
          icon={['far', icon]}
          onMouseEnter={this.showTooltip}
          className={color}
        />
      </span>
    )
  }
}

export default TooltipIcon
