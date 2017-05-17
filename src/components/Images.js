import React, { Component } from 'react'
import Image from './Image'

const imageList = [
  { key: 0, url: './img/int_01.jpg' },
  { key: 1, url: './img/int_02.jpg' },
  { key: 2, url: './img/int_03.jpg' },
  { key: 3, url: './img/int_04.jpg' }
]

class Images extends Component {
  render() {
    return (
      <div className='img-container selectDisable'>
        {imageList.map(image => <Image id={image.key} {...image} />)}
      </div>
    )
  }
}

export default Images
