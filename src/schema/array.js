import { Component, PropTypes } from 'react';

export default class SchemaArray extends Component{
  static displayName = 'SchemaArray';
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData() {
    return [];
  }

  _onAdd = e => {
    let _data = this._getItems();
    _data.push(0);
    this.setState({
      _data: _data
    });
  };

  _onClear = e => {
    this.setState({
      _data: []
    });
  };

  _onDel = index => {
    let _data = this._getItems();
    let newData = [];
    _data.forEach((item, i) => {
      if(i !== index) {
        newData.push(item);
      }
    });
    this.setState({
      _data: newData
    });
  };
  _onUp = index => {
    let _data = this._getItems();
    let tmp = _data[index];
    _data[index] = _data[index - 1];
    _data[index - 1] = tmp;
    this.setState({
      _data: _data
    });
  };
  _onDown = index => {
    let _data = this._getItems();
    let tmp = _data[index];
    _data[index] = _data[index + 1];
    _data[index + 1] = tmp;
    this.setState({
      _data: _data
    });
  };

  _getItems() {
    let { data } = this.props;
    let { _data } = this.state;
    data = data || [];
    return _data || data;
  }

  render() {
    let { schema, data, tag } = this.props;
    let _data = this._getItems();
    let { Utils } = this.constructor;
    let UIBox = Utils.getUI('box');

    let { type, format } = schema.items;
    format = format || '';
    let uniqueKey = type + '+' + format;
    let itemLength = _data.length;
    let items = _data.map((item, i) => {
      let content = Utils.getSchemaComp(
        uniqueKey, `item_${i}`, schema.items, item, `${tag}[${i}]`);
      let upBtn = '', downBtn = '';
      if(i > 0) {
        upBtn = <button className="up-btn" onClick={this._onUp.bind(this, i)}>上移</button>;
      }
      if(i < itemLength - 1) {
        downBtn = <button className="down-btn" onClick={this._onDown.bind(this, i)}>下移</button>;
      }
      return <div key={i} className="array-item">
        {content}
        <button className="del-btn" onClick={this._onDel.bind(this, i)}>删除</button>
        {upBtn}
        {downBtn}
      </div>;
    });


    return <UIBox title={schema.title} tag={tag} collapse={false}>
      <div className="schema-array">
        <div className="items-cont">{items}</div>
        <button className="add-btn" onClick={this._onAdd}>增加一个</button>
        <button className="clear-btn" onClick={this._onClear}>清空</button>
      </div>
    </UIBox>;

  }
}
