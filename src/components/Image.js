import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setModal, setLoaded } from '../redux/actions'

class Image extends Component {

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
    const { url, info, id, mobile } = this.props;
    const { updateModal, updateLoaded } = this.props;

    const display = {
      display: 'block'
    };
    const hide = {
      display: mobile ? 'block' : 'none'
    };

    let className = 'thumb';
    className += id % 2 ? ' right' : ' left';
    className += id < 2 ? ' top' : ' bottom';

    return (
      <div>
        <div className={className}>
          <img
            onClick={() => updateModal(url)}
            onLoad={updateLoaded}
            onMouseOver={this.mouseOver.bind(this)}
            onMouseLeave={this.mouseLeave.bind(this)}
            className='thumbImg'
            src={url}>
          </img>
          <div className='overlay' style={this.state.info ? display : hide}></div>
          <p className="infoImg" style={this.state.info ? display : hide}>{info}</p>
        </div>
      </div>
    )
  }
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    mobile: state.mobile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateModal: (url) => dispatch(setModal(url)),
    updateLoaded: () => dispatch(setLoaded())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image)
