import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode } from '../redux/actions'
import Visual from './Visual'

// APP CONTAINER
class App extends Component {
  render() {
    const { vrMode, isMouseDown } = this.props;
    const { updateMode } = this.props;

    if (vrMode) {
      return (
        <div className="app">
          <div className="header">
            <div className="banner"></div>
            <div className="logo"></div>
          </div>
          <div className="info">
            <h1>360 IMAGES</h1>
            <button onClick={updateMode}>DISABLE VR MODE!</button>
          </div>
          <Visual/>
        </div>
      )
    } else {
      return (
        <div className="app">
          <div className="header">
            <div className="banner"></div>
            <div className="logo"></div>
          </div>
          <div className="info">
            <h1>FLAT IMAGES</h1>
            <button onClick={updateMode}>ENABLE VR MODE!</button>
          </div>
          <Visual/>
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
