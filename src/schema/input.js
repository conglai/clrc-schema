import { Component, PropTypes } from 'react';

export default class SchemaInput extends Component {
  static displayName = 'SchemaInput';

  getData() {
    let inputValue = this.refs.input.value || '';
    let { schema } = this.props;
    if(schema.type === 'integer') {
      inputValue = Number(inputValue);
      inputValue = inputValue || 0;
    }
    return inputValue;
  }

  render() {
    let { data, schema, tag } = this.props;
    let { Utils } = this.constructor;
    let UIBox = Utils.getUI('box');

    return <UIBox title={schema.title} tag={tag}>
      <input ref="input" type="text" defaultValue={data}/>
    </UIBox>;
  }
}

