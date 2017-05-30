// IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode, setRotation, setMouseDown, setMouseUp } from '../redux/actions'
import Images from '../components/Images'
import Envs from '../components/Envs'

// Paths for the Env image files
const imageList = [
  { key: 0, url: './img/360_01.jpg' },
  { key: 1, url: './img/360_02.jpg' },
  { key: 2, url: './img/360_03.jpg' },
  { key: 3, url: './img/360_04.jpg' }
]

// Locations for the inactive Envs which will generate a circle
const locations = [
  { 0: 0, 1: 300, 2: 210, 3: 0 },
  { 0: 310, 1: 0, 2: 350, 3: 262.5 },
  { 0: 270, 1: 270, 2: 0, 3: 270 },
  { 0: 90, 1: 175, 2: 270, 3: 0 }
]

// Rotation of the Env texture on the sphere itself
const rotations = [
  { 0: 222.5, 1: 270, 2: 300, 3: 0 },
  { 0: 160, 1: 35, 2: 135, 3: 270 },
  { 0: 60, 1: 0, 2: 85, 3: 0 },
  { 0: 0, 1: 45, 2: 0, 3: 90 }
]

// Visible tag for the current location
const visible = [
  { 0: true, 1: true, 2: true, 3: false },
  { 0: true, 1: true, 2: true, 3: true },
  { 0: true, 1: false, 2: true, 3: false },
  { 0: false, 1: true, 2: false, 3: true }
]

// APP CONTAINER
class App extends Component {

  render() {
    const { vrMode, isMouseDown,
      updateMode, updateRotation,
      updateMouseDown, updateMouseUp } = this.props;

    if (vrMode) {
      return (
        <div
          onMouseDown={updateMouseDown}
          onMouseUp={updateMouseUp}
          onMouseMove={isMouseDown ? updateRotation : null}>
          <h1>360 IMAGES</h1>
          <button onClick={updateMode}>DISABLE VR MODE!</button>
        <Envs imageList={imageList} locations={locations} rotations={rotations} visible={visible}/>
        </div>
      )
    } else {
      return (
        <div>
          <h1>FLAT IMAGES</h1>
          <button onClick={updateMode}>ENABLE VR MODE!</button>
          <Images imageList={imageList} />
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
    updateMode: () => dispatch(setMode()),
    updateRotation: () => dispatch(setRotation()),
    updateMouseDown: () => dispatch(setMouseDown()),
    updateMouseUp: () => dispatch(setMouseUp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
