import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import 'aframe-mouse-cursor-component'

export default class Camera extends Component {
  render() {

    return (
      <Entity id="camera" className="camera" camera="fov: 120" look-controls mouse-cursor>
        {/* <a-cursor fuse="true" color="yellow"></a-cursor> */}
      </Entity>
    )
  }
}
