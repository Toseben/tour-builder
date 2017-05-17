import React, { Component } from 'react'
import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Env from './Env'
import Camera from './Camera'

class Envs extends Component {
  render() {
    const { imageList } = this.props;

    return (
      <div className='img-container selectDisable'>
        <Scene className='aframe' embedded>
          <a-sky color="#ECECEC"></a-sky>
          {imageList.map(image => <Env id={image.key} {...image} />)}
          <Camera />
        </Scene>
        <img className="map" src="./img/calvin.jpg"></img>
      </div>
    )
  }
}

export default Envs
