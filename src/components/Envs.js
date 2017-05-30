import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoaded } from '../redux/actions'

import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Env from './Env'
import Camera from './Camera'

class Envs extends Component {

  componentDidMount() {
    const { updateLoaded } = this.props;
    updateLoaded();
  }

  render() {
    const { imageList, locations, rotations, visible, rotation, activeSphere } = this.props;
    const currentLocations = locations[activeSphere];
    const currentRotations = rotations[activeSphere];
    const visibleTag = visible[activeSphere];

    let rotate = 'rotate(' + -rotation + 'deg)';
    let css = {
      WebkitTransform: rotate
    };

    return (
      <div className='img-container'>
        <Scene className='aframe' embedded>
          <a-sky color="#ECECEC"></a-sky>
          {imageList.map(image => <Env id={image.key} {...image}
            active={image.key === activeSphere}
            location={currentLocations[image.key]}
            rotation={currentRotations[image.key]}
            visible={visibleTag[image.key]}/>)}
          <Camera />
        </Scene>
        <img className="map selectDisable" src="./img/calvin.jpg" style={css}></img>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    rotation: state.rotation,
    activeSphere: state.activeSphere
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoaded: () => dispatch(setLoaded()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Envs)
