import React from 'react'

import Pan from '../pan/pan.jsx'
import Zoom from '../zoom/zoom.jsx'

export default class PanZoom extends React.Component {
  render() {
    return (
      <div ref='panZoomContainer' className='pan-zoom-container'>
        <Zoom
          ref='zoom'
          onZoomIn={ this.onZoomIn.bind(this) }
          onZoomOut={ this.onZoomOut.bind(this) }>
          <Pan ref='pan' currentZoom={this.currentZoom.bind(this)}>
            <img
              ref='mainImage'
              src={ this.props.imageUrl }
              onLoad={ this.ensureImageFit.bind(this) }
              draggable='false' />
          </Pan>
        </Zoom>
      </div>
    )
  }

  currentZoom() {
    return this.refs.zoom.getZoomFactor()
  }

  onZoomIn() {
    this.refs.pan.reset()
    this.refs.pan.enable()
  }

  onZoomOut() {
    this.refs.pan.reset()
    this.refs.pan.disable()
  }

  ensureImageFit() {
    const containerHeight = this.refs.panZoomContainer.offsetHeight
    const imageHeight = this.refs.mainImage.offsetHeight
    const panZoomContainer = this.refs.panZoomContainer

    if (imageHeight > containerHeight) {
      panZoomContainer.classList.add('top-aligned')
    } else {
      panZoomContainer.classList.remove('top-aligned')
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.ensureImageFit.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ensureImageFit.bind(this))
  }
}
