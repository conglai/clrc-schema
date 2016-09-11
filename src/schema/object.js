import { Component, PropTypes } from 'react';

export default class SchemaObject extends Component{
  static displayName = 'SchemaObject';

  getData() {
    let { properties } = this.props.schema;
    let keys = Object.keys(properties);
    let result = {};
    keys.forEach(key => {
      let comp = this.refs[`prop_${key}`];
      result[key] = comp.getData();
    });
    return result;
  }

  render() {
    let { schema, data, tag, collapse } = this.props;
    data = data || {};
    let keys = Object.keys(schema.properties);
    let { Utils } = this.constructor;
    let UIBox = Utils.getUI('box');
    let propNodes = keys.map((key, i) => {
      let subSchema = schema.properties[key];
      let subData = data[key];
      let { type, format } = subSchema;
      format = format || '';
      let uniqueKey = type + '+' + format;
      return Utils.getSchemaComp(uniqueKey, `prop_${key}`, subSchema, subData, `${tag}.${key}`);
    });
    return <UIBox title={schema.title} tag={tag} collapse={collapse}>
      {propNodes}
    </UIBox>;
  }
}
