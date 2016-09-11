import { Component, PropTypes } from 'react';
import SchemaBox from './schema-box';
import SchemaImage from './schema-image';
import SchemaInput from './schema-input';
import SchemaFile from './schema-file';
import SchemaEditor from '../index';


export default class SchemaItemInput extends Component{
  static displayName = 'SchemaItemInput';

  getData() {
    let { properties, item } = this.props;
    let keys = Object.keys(properties);
    let result = {};
    keys.forEach(key => {
      let comp = this.refs[`prop_${key}`];
      result[key] = comp.getData();
    });
    return result;
  }

  _onSave = () => {
    let { onSave } = this.props;
    onSave && onSave(this.getData());
  };

  render() {
    let { properties, item } = this.props;
    item = item || {};
    let keys = Object.keys(properties);
    return <div className="schema-input">
      {keys.map((key, i) => {
        let subSchema = properties[key];
        let input = '';
        let { type, format } = subSchema;
        format = format || '';
        let value = item[key];
        if(format === 'pic') {
          input = <SchemaImage ref={`prop_${key}`} src={value}/>;
        } else if(format === 'file') {
          input = <SchemaFile ref={`prop_${key}`} value={value}/>;
        } else if(type === 'string' || type === 'integer') {
          input = <SchemaInput ref={`prop_${key}`} type={type} value={value}/>;
        }

        return <div className="input-item" key={i}>
          <div className="input-title">{subSchema.title}</div>
          <div className="input-cont">
            {input}
          </div>
          <div className="input-desc">{subSchema.desc}</div>
        </div>;
      })}
      <div className="input-item">
        <button onClick={this._onSave}>save</button>
      </div>
    </div>;
  }
}
