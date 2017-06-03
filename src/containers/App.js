import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setModeTrue, setModeFalse, setModal } from '../redux/actions'
import Visual from './Visual'

// APP CONTAINER
class App extends Component {

  render() {
    const { modal, vrMode, image } = this.props;
    const { updateModeTrue, updateModeFalse, updateModal } = this.props;

    const display = {
      display: 'block'
    };
    const hide = {
      display: 'none'
    };

    let imageIcon = 'mode';
    imageIcon += vrMode ? '' : ' active';

    let vrIcon = 'mode noBorder';
    vrIcon += vrMode ? ' active' : '';

    return (
      <div className="app">

        <div className="header selectDisable">
          <h1 className="company">Company Name</h1>
          <div className="banner"></div>
          <div className="logo"></div>
        </div>

        <div className="infoContainer">

          <div className="subContainer noBorder extra"></div>

          <div className="subContainer selectDisable">
            <div className="stats">
              <p className="stat">57.2m²</p>
            </div>
            <div className="stats">
              <p className="stat">1250&euro;/kk</p>
            </div>
            <div className="stats">
              <p className="stat">2H+K</p>
            </div>
            <div className="stats noBorder">
              <p className="stat offset">527</p>
              <span className="icon-heart"></span>
            </div>
          </div>

          <div className="subContainer">
            <div className={imageIcon} onClick={vrMode ? updateModeFalse : undefined}>
              <span className="icon-image"></span>
            </div>
            <div className={vrIcon} onClick={vrMode ? undefined : updateModeTrue}>
                <span className="icon-vr"></span>
            </div>
          </div>

          <div
            className="modal" onClick={updateModal} style={modal ? display : hide}>
            <img className='modalImg' src={image}></img>
          </div>

        </div>
        <Visual/>
        <div className="footer"></div>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    vrMode: state.vrMode,
    image: state.image
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateModeTrue: () => dispatch(setModeTrue()),
    updateModeFalse: () => dispatch(setModeFalse()),
    updateModal: () => dispatch(setModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
