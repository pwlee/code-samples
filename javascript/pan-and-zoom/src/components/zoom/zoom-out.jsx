import React from 'react'

import ZoomButton from './zoom-button.jsx'

export default class ZoomOut extends ZoomButton {
  constructor(props) {
    super(props)

    this.disable()
  }

  render () {
    return (
      <span className={'zoom-out' + (!this.isEnabled() ? ' disabled' : '')} onClick={this.handleClick.bind(this)} >
        <svg x="0px" y="0px" viewBox="0 0 80.3 80.3" role="img" aria-labelledby="zoom-out-svg zoom-out-svg-desc">
          <g>
            <path d="M78.8,73.3L57.7,52.2c-0.3-0.3-0.6-0.5-0.9-0.7c4.4-5.6,6.8-12.5,6.8-19.7c0-8.5-3.3-16.5-9.3-22.5c-6-6-14-9.3-22.5-9.3
              C23.3,0,15.3,3.3,9.3,9.3c-12.4,12.4-12.4,32.6,0,45c6,6,14,9.3,22.5,9.3c7.2,0,14.1-2.4,19.7-6.8c0.2,0.3,0.4,0.6,0.7,0.9
              l21.1,21.1c1.5,1.5,4,1.5,5.6,0C80.4,77.3,80.4,74.8,78.8,73.3z M51,51C45.9,56.2,39.1,59,31.8,59c-7.2,0-14.1-2.8-19.2-7.9
              c-10.6-10.6-10.6-27.8,0-38.4c5.1-5.1,11.9-7.9,19.2-7.9c7.2,0,14.1,2.8,19.2,7.9c5.1,5.1,7.9,11.9,7.9,19.2
              C59,39.1,56.1,45.9,51,51z"/>
          </g>
          <path d="M43.5,29H20.1c-1.3,0-2.4,1.2-2.4,2.5s1.1,2.5,2.4,2.5h23.4c1.3,0,2.4-1.2,2.4-2.5S44.8,29,43.5,29z"/>
        </svg>
      </span>
    )
  }
}