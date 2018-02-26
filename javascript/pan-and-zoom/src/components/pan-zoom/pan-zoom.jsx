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
          <Pan ref='pan' currentZoomFactor={this.currentZoomFactor.bind(this)}>
            <img ref='mainImage' src={ this.props.imageUrl } draggable='false' />
          </Pan>
        </Zoom>
      </div>
    )
  }

  currentZoomFactor() {
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

  // TODO: gross
  ensureImageFit() {
    const containerHeight = this.refs.panZoomContainer.offsetHeight
    const imageHeight = this.refs.mainImage.offsetHeight

    this.refs.mainImage.width = this.refs.mainImage.offsetWidth
    this.refs.mainImage.height = this.refs.mainImage.offsetHeight

    if (imageHeight > containerHeight) {
      this.refs.panZoomContainer.classList.add('top-aligned')
    }
    else {
      this.refs.panZoomContainer.classList.remove('top-aligned')
    }
  }

  // TODO: gross-ish
  componentDidMount() {
    window.addEventListener('resize', this.ensureImageFit.bind(this))
    this.refs.mainImage.addEventListener('load', this.ensureImageFit.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ensureImageFit.bind(this))
  }
}
