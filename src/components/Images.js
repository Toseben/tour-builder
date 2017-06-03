import React, { Component } from 'react'
import { connect } from 'react-redux'
import Image from './Image'

class Images extends Component {
  render() {
    const { imageList } = this.props;

    const loadingVis = this.props.sceneLoaded ? 0 : 1;
    let loading_css = {
      opacity: loadingVis
    };

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

        {imageList.map(image => <Image id={image.key} info={imageList[image.key].room} {...image} />)}
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
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
)(Images)
