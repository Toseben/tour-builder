// IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode, setRotation, setMouseDown, setMouseUp } from '../redux/actions'
import Images from '../components/Images'
import Envs from '../components/Envs'

const imageList = [
  { key: 0, url: './img/int_01.jpg' },
  { key: 1, url: './img/int_02.jpg' },
  { key: 2, url: './img/int_03.jpg' },
  { key: 3, url: './img/int_04.jpg' }
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
        <Envs imageList={imageList} />
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
