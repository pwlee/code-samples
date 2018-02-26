import React from 'react'

export default class ZoomButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enabled: true
    }
  }

  handleClick() {
    if (this.isEnabled() && this.props.onClick) {
      this.props.onClick()
    }
  }

  enable() {
    this.state.enabled = true
  }

  isEnabled() {
    return this.state.enabled
  }

  disable() {
    this.state.enabled = false
  }
}
