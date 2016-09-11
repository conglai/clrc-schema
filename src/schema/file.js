import { Component, PropTypes } from 'react';
import SchemaEditor from '../index';
import Uploader from '@rc/qn-uploader';

export default class SchemaFile extends Component{
  static displayName = 'SchemaFile';

  getData() {
    return this._src || this.props.path || '';
  }

  _fileInputChange = async function(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let fileName = file.name;
    let res = fileName.split('.');
    let type = res[res.length - 1];
    let uptoken = await SchemaEditor.getUptoken(type);

    let uploader = new Uploader(file, uptoken);
    uploader.upload();
    uploader.on('progress', () => {
      this.setState({
        _text: Math.floor(uploader.percent * 100) + '%'
      });
    });
    uploader.on('complete', () => {
      this._src = SchemaEditor.assetPath + uploader.imgRes.key;
      this.setState({
        _text: this._src
      });
    });
  };

  render() {
    let { path, value } = this.props;
    let { _text } = this.state || {};
    _text = _text || value;
    return <div className="file-uploader">
      <span className="short-text">{_text}</span>
      <input
        type="file"
        multiple="true"
        accept="*"
        onChange={this._fileInputChange.bind(this)}
      />
    </div>;
  }
}
