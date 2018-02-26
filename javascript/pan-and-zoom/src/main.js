import React from 'react'
import { render } from 'react-dom'

import PanZoom from './components/pan-zoom/pan-zoom.jsx'

// Include entry point for styles for Webpack
const styles = require('./css/main.scss')

document.addEventListener('DOMContentLoaded', () => {
  const imageUrl = 'https://bonobos-prod-s3.imgix.net/products/7849/original/SHIRT_Casual_EndOnEnd_Blue_hero1.jpg?h=3000&w=3000'
  const imageElement = document.querySelector('.product > .image')

  render(<PanZoom imageUrl={imageUrl} />, imageElement)
})
