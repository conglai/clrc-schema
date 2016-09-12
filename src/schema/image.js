import { Component, PropTypes } from 'react';
import QNImg from 'clrc-qnimg';

export default class SchemaImage extends Component{
  static displayName = 'SchemaImage';

  getData() {
    return this._src || this.props.src || '';
  }

  render() {
    let { data, schema, tag, inline } = this.props;
    let content = <QNImg config={{
      src: '//cdn.withme.cn/withme.back.u.2f7f440d35a38b7610eba472762c120f.jpg',
      w: 100,
      h: 100
    }}/>;

    if(inline) {
      return <span className="schema-inline">
        {content}
      </span>;
    } else {
      let { Utils } = this.constructor;
      let UIBox = Utils.getUI('box');
      return <UIBox title={schema.title} tag={tag}>
        {content}
      </UIBox>;
    }
  }
}
