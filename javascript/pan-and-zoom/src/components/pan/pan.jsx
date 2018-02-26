import React from 'react'

export default class Pan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enabled: false,
      panning: false,
      cumulativeOffsetX: 0,  // Keep track of cumulative offsets as a user
      cumulativeOffsetY: 0,  // pans multiple times through the zoomed image

      panStartX: 0,          // Keep track of where the initial click/touch occurs so
      panStartY: 0,          // we can determine how far the mouse/finger has moved

      translateX: 0,         // Final computed translation based on: cumulativeOffset,
      translateY: 0          // panStart, and current mouse/finger position
    }
  }

  render() {
    return (
      <div className='pan-container'>
        <div
          ref="panContent"
          className='pan-content'
          style={ this.styles() }
          onMouseDown={ this.startMousePan.bind(this) }
          onTouchStart={ this.startTouchPan.bind(this) }
          onMouseUp={ this.endPan.bind(this) }
          onTouchEnd={ this.endPan.bind(this) }
          onMouseMove={ this.mousePan.bind(this) }
          onTouchMove={ this.touchPan.bind(this) } >

          { this.props.children }
        </div>
      </div>
    )
  }

  enable() {
    this.setState({enabled: true})
  }

  disable() {
    this.setState({enabled: false})
  }

  isEnabled() {
    return this.state.enabled
  }

  isPanning() {
    return this.state.panning
  }

  startTouchPan(touchEvent) {
    const touch = touchEvent.touches[0]
    this.startPan(touch.screenX, touch.screenY)
  }

  startMousePan(mouseEvent) {
    this.startPan(mouseEvent.screenX, mouseEvent.screenY)
  }

  startPan(screenX, screenY) {
    if (this.isEnabled()) {
      this.setState({
        panning: true,
        panStartX: screenX,
        panStartY: screenY
      })
    }
  }

  endPan() {
    if (this.isPanning()) {
      this.setState({
        panning: false,
        cumulativeOffsetX: this.state.translateX,
        cumulativeOffsetY: this.state.translateY
      })
    }
  }

  touchPan(touchEvent) {
    const touch = touchEvent.touches[0]
    this.pan(touch.screenX, touch.screenY, true, touchEvent)
  }

  mousePan(mouseEvent) {
    this.pan(mouseEvent.screenX, mouseEvent.screenY, false, mouseEvent)
  }

  pan(screenX, screenY, isTouch, pointEvent) {
    if (!this.isPanning()) {
      return
    }

    pointEvent.preventDefault()
    if (!isTouch) {
      this.props.disableZoomToggle()
    }

    // Calculate how far the mouse has moved from the initial click/touch point
    const xDifference = screenX - this.state.panStartX
    const yDifference = screenY - this.state.panStartY

    // Add the difference on top of all/any previous pans
    const newXTranslate = this.state.cumulativeOffsetX + xDifference
    const newYTranslate = this.state.cumulativeOffsetY + yDifference

    // Compute the bounds of the scaled image
    const bounds = this.refs.panContent.getBoundingClientRect()
    const maxXTranslate = bounds.width / Math.pow(this.props.currentZoom(), 2)
    const maxYTranslate = bounds.height / Math.pow(this.props.currentZoom(), 2)

    // Pick the appropriate x/y coordinates which lie in bounds
    this.setState({
      translateX: [-maxXTranslate, newXTranslate, maxXTranslate].sort((a,b) => a-b)[1],
      translateY: [-maxYTranslate, newYTranslate, maxYTranslate].sort((a,b) => a-b)[1]
    })
  }

  styles() {
    return {
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
    }
  }

  reset() {
    this.setState({
      cumulativeOffsetX: 0,
      cumulativeOffsetY: 0,
      panStartX: 0,
      panStartY: 0,
      translateX: 0,
      translateY: 0
    })
  }
}
