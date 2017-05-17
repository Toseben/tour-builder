import React, { Component } from 'react'

export default class Image extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      toggle: false,
      info: false
    }
  }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
    this.mouseLeave()
  }

  mouseOver() {
    this.setState({info: true});
  }

  mouseLeave() {
    this.setState({info: false});
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
        <div className='thumb'>
          <img
            onClick={this.toggle.bind(this)}
            onMouseOver={this.mouseOver.bind(this)}
            onMouseLeave={this.mouseLeave.bind(this)}
            className='img'
            src={url}>
          </img>
          <div className='overlay' style={this.state.info ? display : hide}></div>
          <p className="info" style={this.state.info ? display : hide}>{url}</p>
        </div>
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
