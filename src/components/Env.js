import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'
import { setActive, setLoaded } from '../redux/actions'

const vertex = require('raw-loader!../shaders/vertex.glsl');
const fragment = require('raw-loader!../shaders/fragment.glsl');

// Pass reducer to component
let callActive, callLoaded;

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

AFRAME.registerComponent('cursor-listener', {

  init: function() {
    const entity = this.el;
    const id = parseInt(entity.getAttribute('id'));
    // CLICK
    entity.addEventListener('click', function() {
      callActive(id);
    })
    // Enter
    entity.addEventListener('mouseenter', function() {
      entity.setAttribute('apply-shader', { hover: '1' });
    })
    // EXIT
    entity.addEventListener('mouseleave', function() {
      entity.setAttribute('apply-shader', { hover: '0' });
    })
  }
})

AFRAME.registerComponent('apply-shader', {

  schema: {
    texture: {type: 'asset'},
    active: {type: 'int'},
    hover: {type: 'int'}
  },

  init: function() {

    const mesh = this.el.getObject3D('mesh');

    var manager = new THREE.LoadingManager();
    manager.onLoad = function ( ) {
      callLoaded();
    };

    var loader = new THREE.TextureLoader(manager);
    var texture = loader.load( this.data.texture );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    this.uniforms = {
      texture: { type: 't', value: texture },
      active: { value: this.data.active },
      hover: { value: this.data.hover }
    };

    mesh.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide
    });
  },

  update: function() {
    this.uniforms.active.value = this.data.active;
    this.uniforms.hover.value = this.data.hover;
  }

})

class Env extends Component {

  render() {
    const { id, url, rotation, visible } = this.props;
    const location = Math.radians(this.props.location);
    const active = this.props.active ? 1 : 0;
    const radius = this.props.active ? 1.5 : 0.25;

    let x = Math.cos(location) * (1 - active);
    let z = Math.sin(location) * (1 - active);
    x = Math.round(x * 10) * 0.1;
    z = Math.round(z * 10) * 0.1;
    const loc = { x: x, z: z };

    const geoRes = { x: 32, y: 16 };
    callActive = this.props.updateActive;
    callLoaded = this.props.updateLoaded;

    return (
      <Entity
        id={id}
        geometry={{primitive: 'sphere', radius: radius, segmentsWidth: geoRes.x, segmentsHeight: geoRes.y }}
        apply-shader={{texture: url, active: active, hover: 0}}
        position={{x: loc.x, z: loc.z}}
        rotation={{y: rotation}}
        visible={visible}
        cursor-listener
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateActive: (id) => dispatch(setActive(id)),
    updateLoaded: () => dispatch(setLoaded())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Env)
