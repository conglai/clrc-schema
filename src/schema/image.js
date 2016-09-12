import { Component, PropTypes } from 'react';
import QNImg from 'clrc-qnimg';
import Uploader from 'qiniu-web-uploader';

export default class SchemaImage extends Component{
  static displayName = 'SchemaImage';

  getData() {
    return this._src || this.props.src || '';
  }

  _browserImages = () => {
    let fileInput = this.refs.file;
    fileInput.value = null;
    fileInput.click();
  };

  _fileInputChange = e => {
    e.preventDefault();
    let files = e.target.files;
    console.log(files);
    // this._checkSize(files[0]);
    this._uploadFile(files[0]);
  };

  _checkSize = file => {
    let { width, height } = this._getSize();
    let url = window.URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        if(img.width === width && img.height === height) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.src = url;
    });
  }

  _uploadFile = async function(file) {
    let { Utils } = this.constructor;
    let isSizeRight = await this._checkSize(file);
    if(!isSizeRight) {
      this.refs.info.warning(`请上传（${this.props.schema.size}）的图片`);
      return;
    }
    let uptoken = await Utils.getUptoken('png');
    let uploader = new Uploader(file, uptoken);
    let res = await uploader.upload();
    let config = this._getBoxSize();
    config.width = Math.floor(config.width);
    let imgConfig = {
      src: `${Utils.assetsHost}${res.key}`,
      w: config.width,
      h: config.height
    };
    this.refs.img.loadPic(imgConfig);
  };

  componentDidMount() {
    // this.refs.info.warning('ssssss');
  }

  _getSize() {
    let { size } = this.props.schema;
    let sizes = size.split('x');
    let width = Number(sizes[0]);
    let height = Number(sizes[1]);
    return { width, height };
  }

  _getBoxSize() {
    let { width, height } = this._getSize();
    let p = height / 100;
    height = 100;
    width = width / p;

    return { width, height };
  }

  render() {

    let { Utils } = this.constructor;
    let WarningText = Utils.getUI('warning-text');
    let { data, schema, tag, inline } = this.props;
    let { width, height } = this._getBoxSize();
    let style = {
      display: 'inline-block',
      width: width,
      height: height,
    };
    let content = <span style={style} className="schema-image">
      <span className="img layer">
        <QNImg ref="img" lazy={true}/>
      </span>
      <span className="mask layer"></span>
      <span className="layer">
        <span className="op-cont">
          <input
            ref="file"
            type="file"
            accept="image/*"
            onChange={this._fileInputChange}
            style={{ display: 'none'}}/>
          <p className="op-upload">
            <button onClick={this._browserImages}>上传</button>
          </p>
          <p className="op-info">
            <WarningText ref="info"/>
          </p>
        </span>
      </span>
    </span>;

    if(inline) {
      return <span className="schema-inline">
        {content}
      </span>;
    } else {
      let UIBox = Utils.getUI('box');
      return <UIBox title={schema.title} tag={tag}>
        {content}
      </UIBox>;
    }
  }
}
