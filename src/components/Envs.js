import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Env from './Env'
import Camera from './Camera'

class Envs extends Component {

  render() {
    const { imageList, locations, rotations, visible, rotation, activeSphere, mobile } = this.props;
    const currentLocations = locations[activeSphere];
    const currentRotations = rotations[activeSphere];
    const visibleTag = visible[activeSphere];
    const mapPos = this.props.mapPos[activeSphere];
    const info = this.props.infos[activeSphere];

    let rotate = 'rotate(' + -rotation + 'deg)';
    let left = mapPos.x + '%';
    let top = mapPos.y + '%';
    let css = {
      WebkitTransform: rotate,
      left: left,
      top: top
    };

    const loadingVisible = this.props.sceneLoaded ? 0.0 : 1.0;
    let loadingCss = {
      opacity: loadingVisible
    };

    // USE THIS!
    // console.log(window.AFRAME.utils.device.isMobile())

    return (
      <div className='img-container'>

        <div className="loading" style={loadingCss}>
          <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>
        </div>

        <h3 className="info-text">{info.room}</h3>

        <Scene className='aframe' embedded>
          <a-sky color="#ECECEC"></a-sky>
          {imageList.map(image => <Env id={image.key} {...image}
            active={image.key === activeSphere}
            location={currentLocations[image.key]}
            rotation={currentRotations[image.key]}
            visible={visibleTag[image.key]}/>)}
          <Camera mobile={mobile}/>
        </Scene>
        <div className="plan-container">
          <img className="plan" src="./img/floorplan.png"></img>
          <img className="arrow" src="./img/arrow.png" style={css}></img>
        </div>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    rotation: state.rotation,
    activeSphere: state.activeSphere,
    sceneLoaded: state.sceneLoaded
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
