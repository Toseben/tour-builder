import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Camera extends Component {
  render() {

    return (
      <Entity id="camera" camera look-controls wasd-controls />
    )
  }
}
