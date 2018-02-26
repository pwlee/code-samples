import React from 'react'

import ZoomIn from './zoom-in.jsx'
import ZoomOut from './zoom-out.jsx'

export default class Zoom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {zoom: 1}
  }

  render() {
    return (
      <div className='zoom-container'>
        <div
          className={'zoom-content' + (this.isZoomedIn() ? ' zoomed-in' : '')}
          onClick={ this.toggleZoom.bind(this) }
          style={ this.zoomStyles() }>
          { this.props.children }
        </div>
        <ZoomIn ref="zoomInComponent" onClick={ this.zoomIn.bind(this) } />
        <ZoomOut ref="zoomOutComponent" onClick={ this.zoomOut.bind(this) } />
      </div>
    )
  }

  getZoomFactor() {
    return this.state.zoom
  }

  toggleZoom(mouseEvent) {
    if (this.isZoomedIn()) {
      this.zoomOut()
    } else {
      this.zoomIn()
    }
  }

  zoomIn() {
    this.setState({zoom: 3})
    this.refs.zoomInComponent.disable()
    this.refs.zoomOutComponent.enable()

    if (this.props.onZoomIn) {
      this.props.onZoomIn()
    }
  }

  zoomOut() {
    this.setState({zoom: 1})
    this.refs.zoomInComponent.enable()
    this.refs.zoomOutComponent.disable()

    if (this.props.onZoomOut) {
      this.props.onZoomOut()
    }
  }

  isZoomedIn() {
    return this.state.zoom > 1
  }

  zoomStyles() {
    return {
      transform: `scale(${this.state.zoom})`
    }
  }
}
