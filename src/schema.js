import { Component, PropTypes } from 'react';

export default class Schema extends Component{
  static displayName = 'Schema';

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
    let { schema, data, tag } = this.props;
    data = data || {};
    let keys = Object.keys(schema.properties);
    let { Utils } = this.constructor;
    let propNodes = keys.map((key, i) => {
      let subSchema = schema.properties[key];
      let subData = data[key];
      let { type, format } = subSchema;
      format = format || '';
      let uniqueKey = type + '+' + format;
      return Utils.getSchemaComp(uniqueKey, `prop_${key}`, subSchema, subData, `${tag}.${key}`);
    });
    return <div className="clrc-schema">
      <h1>{schema.title}</h1>
      <p>{schema.desc || ''}</p>
      <div className="props">
      {propNodes}
      </div>
    </div>;
  }
}
