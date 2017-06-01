// IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRotation, setMouseDown, setMouseUp } from '../redux/actions'
import Images from '../components/Images'
import Envs from '../components/Envs'

const styles = require('../scss/styles.css')

// IMAGE DATA TO PASS TO CHILDREN
const imageList = [
  { key: 0, url: './img/360_01.jpg', room: 'Room 1' },
  { key: 1, url: './img/360_02.jpg', room: 'Room 2' },
  { key: 2, url: './img/360_03.jpg', room: 'Room 3' },
  { key: 3, url: './img/360_04.jpg', room: 'Room 4' }
]

// VISUAL CONTAINER
class Visual extends Component {

  // UPDATE ROTATION ON MOBILE GYRO
  componentWillMount() {
    const { updateRotation } = this.props;

    checkMobile();
    function checkMobile() {
      if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', deviceOrientationTest, false);
      }
    }

    function deviceOrientationTest(event) {
      if (event.beta != null && event.gamma != null) {
        updateRotation();
      }
    }
  };

  render() {
    const { vrMode, isMouseDown } = this.props;
    const { updateRotation, updateMouseDown, updateMouseUp } = this.props;

    if (vrMode) {
      return (
        <div
          onMouseDown={updateMouseDown}
          onMouseUp={updateMouseUp}
          onMouseMove={isMouseDown ? updateRotation : null}>
          <Envs imageList={imageList}/>
        </div>
      )
    } else {
      return (
        <div>
          <Images imageList={imageList}/>
        </div>
      )
    }
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    vrMode: state.vrMode,
    isMouseDown: state.isMouseDown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRotation: () => dispatch(setRotation()),
    updateMouseDown: () => dispatch(setMouseDown()),
    updateMouseUp: () => dispatch(setMouseUp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visual)
