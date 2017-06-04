import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import 'aframe-mouse-cursor-component'

export default class Camera extends Component {
  render() {

    if (this.props.mobile) {
      return (
        <Entity id="camera" className="camera" camera="fov: 120" look-controls mouse-cursor>
          <a-entity cursor="fuse: true; fuseTimeout: 1000"
                    position="0 0 -0.75" scale="0.025 0.025 0.025"
                    material="color: #e74c3c; shader: flat"
                    geometry="primitive: sphere">
          </a-entity>
        </Entity>
      )
    } else {
      return (
        <Entity id="camera" className="camera" camera
          look-controls mouse-cursor wasd-controls>
        </Entity>
      )
    }
  }
}
