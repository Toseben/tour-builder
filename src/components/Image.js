import React, { Component } from 'react'

export default class Image extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false
    }
  }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  render() {
    const { url } = this.props;

    const display = {
      display: 'block'
    };
    const hide = {
      display: 'none'
    };

    return (
      <div>
        <img
          onClick={this.toggle.bind(this)}
          className='img'
          src={url}></img>
        <div className='modal' style={this.state.toggle ? display : hide}>
          <img
            onClick={this.toggle.bind(this)}
            className='modal-img'
            src={url}></img>
        </div>
      </div>
    )
  }
}
