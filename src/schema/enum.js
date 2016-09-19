import { Component, PropTypes } from 'react';

export default class SchemaEnum extends Component {
  static displayName = 'SchemaEnum';

  getData() {
    let inputValue = this.refs.input.value;
    let result;
    let { schema } = this.props;
    let options = schema.enum;
    for (let i = options.length - 1; i >= 0; i--) {
      let op = options[i];
      if(op.name === inputValue) {
        result = op.value;
        break;
      }
    }
    return result;
  }

  componentWillReceiveProps(props){
    let { data } = props;
    this.refs.input.value = data || '';
  }

  render() {
    let { data, schema, tag, inline } = this.props;
    data = data || '';
    let options = schema.enum;
    let defaultData = options[0].name;
    for (let i = options.length - 1; i >= 0; i--) {
      let op = options[i];
      if(op.value === data) {
        defaultData = op.name;
        break;
      }
    }
    let input = <select ref="input" defaultValue={defaultData}>
      {options.map((op, i) => <option key={i} value={op.name}>{op.name}</option>)}
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

