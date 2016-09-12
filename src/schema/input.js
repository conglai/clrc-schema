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

  componentWillReceiveProps(props){
    let { data } = props;
    this.refs.input.value = data || '';
  }

  render() {
    let { data, schema, tag, inline } = this.props;
    data = data || '';
    let input = <input className="schema-input" ref="input" type="text" defaultValue={data}/>;
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

