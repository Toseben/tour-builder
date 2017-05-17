// IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode } from '../redux/actions'
import Images from '../components/Images'
import Envs from '../components/Envs'

// APP CONTAINER
class App extends Component {
  render() {
    const { vrMode, updateMode } = this.props;

    if (vrMode) {
      return (
        <div>
          <h1>360 IMAGES</h1>
          <button onClick={updateMode}>DISABLE VR MODE!</button>
          <Envs />
        </div>
      )
    } else {
      return (
        <div>
          <h1>FLAT IMAGES</h1>
          <button onClick={updateMode}>ENABLE VR MODE!</button>
          <Images />
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
