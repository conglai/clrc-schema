import { Component, PropTypes } from 'react';

export default class WarningText extends Component{
  static displayName = 'WarningText';

  warning(text, color) {
    color = color || '#FF4400';
    this.setState({ _text: text, _color: color });
  }

  render() {
    let { _text, _color } = this.state || { _text: '' };
    let style = {
      color: _color
    };
    return <span style={style}>{_text}</span>;
  }
}
