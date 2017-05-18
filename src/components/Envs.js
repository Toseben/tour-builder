import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Env from './Env'
import Camera from './Camera'

class Envs extends Component {

  render() {
    const { imageList, rotation, updateRotation } = this.props;

    let rotate = 'rotate(' + -rotation + 'deg)';
    let css = {
      WebkitTransform: rotate
    };

    console.log(css)

    return (
      <div className='img-container'>
        <Scene className='aframe' embedded>
          <a-sky color="#ECECEC"></a-sky>
          {imageList.map(image => <Env id={image.key} {...image} />)}
          <Camera />
        </Scene>
        <img className="map" src="./img/calvin.jpg" style={css}></img>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    vrMode: state.vrMode,
    rotation: state.rotation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Envs)
