import React, { Component } from 'react'
import Image from './Image'

class Images extends Component {

  render() {
    const { imageList } = this.props;

    return (
      <div className='imgContainer selectDisable'>
        {imageList.map(image => <Image id={image.key} info={imageList[image.key].room} {...image} />)}
      </div>
    )
  }
}

export default Images
