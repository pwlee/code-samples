import React from 'react'
import { render } from 'react-dom'

import PanZoom from './components/pan-zoom/pan-zoom.jsx'

// Include entry point for styles for Webpack
const styles = require('./css/main.scss')

document.addEventListener('DOMContentLoaded', () => {
  const imageUrl = 'https://bonobos-prod-s3.imgix.net/products/18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg?h=2000&w=2000'
  render(
    <PanZoom imageUrl={imageUrl} />,
    document.querySelector('.product > .image')
  )
})
