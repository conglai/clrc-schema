# Schema React组件 [![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/clrc-schema
[npm-version-image]: http://img.shields.io/npm/v/clrc-schema.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/clrc-schema.svg?style=flat

## 安装
```
npm i clrc-schema
```

## 使用

```

const schema = {
  //json schema
};
const data = {
  //数据
};
const { Schema } = SchemaUtils;
//# 获取七牛的Uptoken，用于{ type:'string', format: 'image' }
SchemaUtils.getUptoken = function(type) {
  let url = `http://yy.weixinzhuyi.com/i/get-uptoken-jsonp?type=${type}`;
  return $.ajax({
    dataType: 'jsonp',
    url: url,
  }).then(res => {
    return res.data.uptokens[0];
  });
};
SchemaUtils.assetsHost = '//cdn.withme.cn/';
SchemaUtils.init();

class APP extends Component {
  render() {
    return <div>
      <Schema ref="obj" schema={schema} data={data}/>
    </div>;
  }
};

```

## 枚举的Schema的约束

```
{
  type: 'enum',
  title: '选项名',
  enum: [
    { value: 'A', name: 'A'}, //value和name必须是这样的格式
    { value: 'B', name: 'B'},
    { value: 'C', name: 'C'},
    { value: 'D', name: 'D'},
  ]
}
```
