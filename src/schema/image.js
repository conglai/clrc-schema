import { Component, PropTypes } from 'react';
import QNImg from 'clrc-qnimg';

export default class SchemaImage extends Component{
  static displayName = 'SchemaImage';

  getData() {
    return this._src || this.props.src || '';
  }

  render() {
    let { data, schema, tag } = this.props;
    let { Utils } = this.constructor;
    let UIBox = Utils.getUI('box');

    return <UIBox title={schema.title} tag={tag}>
      <QNImg config={{}}/>
    </UIBox>;
  }
}
