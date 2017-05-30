import React, { Component } from 'react'
import Image from './Image'

class Images extends Component {

  render() {
    const { imageList } = this.props;

    return (
      <div className='img-container selectDisable'>
        {imageList.map(image => <Image id={image.key} {...image} />)}
      </div>
    )
  }
}

export default Images
