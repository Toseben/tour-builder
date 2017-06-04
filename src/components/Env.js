import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'
import { setActive, setLoaded } from '../redux/actions'

// LOAD SHADERS
const vertex = require('raw-loader!../shaders/vertex.glsl');
const fragment = require('raw-loader!../shaders/fragment_adv.glsl');

// REDUCERS FOR COMPONENTS
let updateActive, updateLoaded;

// DEGREES TO RADIANS
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// RADIANS TO DEGREES
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// CURSOR INTERACTIONS
AFRAME.registerComponent('cursor-listener', {

  init: function() {
    const entity = this.el;
    const id = parseInt(entity.getAttribute('id'));

    // CLICK
    entity.addEventListener('click', function() {
      updateActive(id);
    })

    // ENTER
    entity.addEventListener('mouseenter', function() {
      entity.setAttribute('apply-shader', { hover: '1' });
    })

    // EXIT
    entity.addEventListener('mouseleave', function() {
      entity.setAttribute('apply-shader', { hover: '0' });
    })

  }
})

// APPLY SHADERS
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
      updateLoaded();
    };

    var loader = new THREE.TextureLoader(manager);
    var texture = loader.load( this.data.texture );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

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
    const { id, url, rot, vis } = this.props;
    const active = this.props.active ? 1 : 0;
    const radius = this.props.active ? 1.5 : 0.25;
    const geoRes = { x: 24, y: 24 };

    const loc = Math.radians(this.props.loc);
    let x = Math.cos(loc) * (1 - active);
    let z = Math.sin(loc) * (1 - active);
    x = Math.round(x * 10) * 0.1;
    z = Math.round(z * 10) * 0.1;
    const radianLoc = { x: x, z: z };

    console.log(radianLoc)

    // REDUCERS FOR COMPONENTS
    updateActive = this.props.updateActive;
    updateLoaded = this.props.updateLoaded;

    return (
      <Entity
        id={id}
        // geometry={{primitive: 'sphere', radius: radius, segmentsWidth: geoRes.x, segmentsHeight: geoRes.y }}
        geometry={{primitive: 'plane' }}
        scale={{x: 2, y: 1, z: 1}}
        apply-shader={{texture: url, active: active, hover: 0}}
        position={{x: radianLoc.x, z: radianLoc.z}}
        rotation={{y: rot}}
        visible={vis}
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
