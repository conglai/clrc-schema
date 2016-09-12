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
    let { schema, data, tag, inTable } = this.props;
    data = data || {};
    let keys = Object.keys(schema.properties);
    let { Utils } = this.constructor;
    tag = tag || '';
    let inline = Utils.isInline(schema);

    let propNodes = keys.map((key, i) => {
      let subSchema = schema.properties[key];
      let subData = data[key];
      let { type, format } = subSchema;
      format = format || '';
      let uniqueKey = type + '+' + format;
      let COMP = Utils.getSchemaComp(uniqueKey);
      let ref = `prop_${key}`;
      let compObj = <COMP
        key={ref}
        ref={ref}
        schema={subSchema}
        data={subData}
        tag={`${tag}.${key}`}
        inline={inline}
      />;
      if(inTable) {
        return <td className={`m-col-${i}`} key={`${ref}${i}`}>
        {compObj}
        </td>;
      }

      if(inline) {
        return <div className="object-key-row" key={i}>
          <span className="key-title">{subSchema.title}</span>
          <span className="key-obj">{compObj}</span>
        </div>;
      } else {
        return compObj;
      }
    });

    if(inTable) {
      return <tr>
        {propNodes}
      </tr>;
    }
    if(tag.indexOf('.') === -1) {
      return <div className="clrc-schema">
        <h1>{schema.title}</h1>
        <p>{schema.desc || ''}</p>
        <div className="props">
        {propNodes}
        </div>
      </div>;
    }

    let UIBox = Utils.getUI('box');
    return <UIBox title={schema.title} desc={schema.desc} tag={tag}>
      {propNodes}
    </UIBox>;
  }
}
