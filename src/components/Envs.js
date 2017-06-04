import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMobile } from '../redux/actions'

import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Env from './Env'
import Camera from './Camera'

require('aframe-always-fullscreen-component');
require('platform');

// LOC OF SPHERES IN DEGREES
const loc = [
  { 0: 0, 1: 300, 2: 210, 3: 0 },
  { 0: 310, 1: 0, 2: 350, 3: 262.5 },
  { 0: 270, 1: 270, 2: 0, 3: 270 },
  { 0: 90, 1: 175, 2: 270, 3: 0 }
]

// ROTATION OF SPHERES IN DEGREES
const rot = [
  { 0: 222.5, 1: 270, 2: 300, 3: 0 },
  { 0: 160, 1: 35, 2: 135, 3: 270 },
  { 0: 60, 1: 0, 2: 85, 3: 0 },
  { 0: 0, 1: 45, 2: 0, 3: 90 }
]

// IS SPHERE VISIBLE
const vis = [
  { 0: true, 1: true, 2: true, 3: false },
  { 0: true, 1: true, 2: true, 3: true },
  { 0: true, 1: false, 2: true, 3: false },
  { 0: false, 1: true, 2: false, 3: true }
]

// ARROW LOCATION ON MAP
const arrowLoc = [
  { x: 25, y: 55},
  { x: 51, y: 47.5},
  { x: 77.5, y: 40},
  { x: 77.5, y: 65}
]

class Envs extends Component {

  render() {
    const { imageList, rotation, activeSphere, mobile } = this.props;
    const { updateMobile } = this.props;
    const currentLoc = loc[activeSphere];
    const currentRot = rot[activeSphere];
    const visTag = vis[activeSphere];
    const info = imageList[activeSphere].room;

    let arrowRotation = 'rotate(' + -rotation + 'deg)';
    let arrowLeft = arrowLoc[activeSphere].x + '%';
    let arrowTop = arrowLoc[activeSphere].y + '%';
    let arrow_css = {
      WebkitTransform: arrowRotation,
      left: arrowLeft,
      top: arrowTop
    };

    const loadingVis = this.props.sceneLoaded ? 0 : 1;
    let loading_css = {
      opacity: loadingVis
    };

    // TRIGGER RESIZE FOR CURSOR
    var scene = document.querySelector('a-scene');
    if (scene) {
      scene.addEventListener('loaded', run);
    }

    function run () {
      setTimeout(function() {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      }, 100)
    };

    // CHECK IF MOBILE
    if (window.AFRAME.utils.device.isMobile()) {
      updateMobile();
    }

    return (
      <div className='imgContainer'>

        <div className="loading" style={loading_css}>
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

        <p className="infoEnv">{info}</p>

        {/* <Scene className='aframe' embedded="true" always-fullscreen="platform:all"> */}
        <Scene className='aframe' embedded="true">
          {imageList.map(image => <Env id={image.key} {...image}
            active={image.key === activeSphere}
            loc={currentLoc[image.key]}
            rot={currentRot[image.key]}
            vis={visTag[image.key]}/>)}
          <Camera mobile={mobile}/>
        </Scene>
        <div className="planContainer">
          <img className="plan" src="./img/floorplan.jpg"></img>
          <img className="arrow" src="./img/arrow.png" style={arrow_css}></img>
        </div>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    rotation: state.rotation,
    mobile: state.mobile,
    activeSphere: state.activeSphere,
    sceneLoaded: state.sceneLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMobile: () => dispatch(setMobile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Envs)
