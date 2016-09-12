import { Component, PropTypes } from 'react';

export default class SchemaEnum extends Component {
  static displayName = 'SchemaEnum';

  getData() {
    let inputValue = this.refs.input.value;
    return inputValue;
  }

  componentWillReceiveProps(props){
    let { data } = props;
    this.refs.input.value = data || '';
  }

  render() {
    let { data, schema, tag, inline } = this.props;
    data = data || '';
    let options = schema.enum;
    let input = <select ref="input" defaultValue={data}>
      {options.map((op, i) => <option key={i} value={op.value}>{op.name}</option>)}
    </select>;
    if(inline) {
      return input;
    }

    let { Utils } = this.constructor;
    let UIBox = Utils.getUI('box');

    return <UIBox title={schema.title} tag={tag}>
      {input}
    </UIBox>;
  }
}

