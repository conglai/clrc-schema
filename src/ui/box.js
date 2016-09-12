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
    collapse: false,
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
    let level = tag.split(/[.\[]/g).length - 1;
    let titleNode;
    if(level > 4) {
      titleNode = <h5>{title}</h5>;
    } else if(!level) {
      titleNode = <h1>{title}</h1>;
    } else if(level === 1) {
      titleNode = <h2>{title}</h2>;
    } else if(level === 2) {
      titleNode = <h3>{title}</h3>;
    } else if(level === 3) {
      titleNode = <h4>{title}</h4>;
    }


    return <div className="schema-box">
      {titleNode}
      <span className="prop-tag">{tag}</span>
      <button className="switch-btn" onClick={this._switchBtn}>{btnText}</button>
      <div className="box" style={style}>{this.props.children}</div>
    </div>;
  }
}
