import { Component, PropTypes } from 'react';

export default class WarningText extends Component{
  static displayName = 'WarningText';

  warning(text) {
    this.setState({ _text: text });
  }

  render() {
    let { _text } = this.state || { _text: '' };
    return <span>{_text}</span>;
  }
}
