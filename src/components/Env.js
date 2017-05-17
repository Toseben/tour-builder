import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Env extends Component {
  render() {
    const { id, url } = this.props;

    return (
      <Entity
        geometry={{primitive: 'sphere', 'radius': 0.5 }}
        material={{color: '#FFF', src: `url(${url})`}}
        position={{x: id - 1.5, y: 0, z: -3}}
      />
    )
  }
}
