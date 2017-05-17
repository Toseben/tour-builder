// IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode } from '../redux/actions'
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
    const { vrMode, updateMode } = this.props;

    if (vrMode) {
      return (
        <div>
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
    vrMode: state.vrMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMode: () => dispatch(setMode())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
