import { Component, PropTypes } from 'react';

let unf;

export default class UIBox extends Component{
  static displayName = 'UIBox';
  static propTypes = {
    collapse: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  };
  static defaultProps = {
    collapse: true,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _switchBtn = () => {
    let { collapse } = this.props;
    let { _switch } = this.state;
    _switch = _switch === unf ? collapse : _switch;
    this.setState({
      _switch: !_switch
    });
  };

  render() {
    let { title, tag, collapse } = this.props;
    let { _switch } = this.state;
    _switch = _switch === unf ? collapse : _switch;

    let btnText = _switch ? '展开': '收起';
    let style = {};
    if(_switch) {
      style.height = 0;
      style.overflow = 'hidden';
    }

    return <div className="schema-box">
      <h3>{title}</h3>
      <span className="prop-tag">{tag}</span>
      <button className="switch-btn" onClick={this._switchBtn}>{btnText}</button>
      <div className="box" style={style}>{this.props.children}</div>
    </div>;
  }
}
