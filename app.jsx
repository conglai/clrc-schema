import './src/index.less';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import SchemaUtils from './src/index';

const schema = {
  type: 'object',
  title: '顺序题的模板',
  properties: {
    title: {
      type: 'string',
      title: '页面标题',
    },
    pics: {
      type: 'object',
      title: '视觉配置参数',
      properties: {
        home_bg: {
          type: 'string',
          format: 'image',
          title: '首页的背景',
          size: '1024x768'
        },
        question_bg: {
          type: 'string',
          format: 'image',
          title: '答题页的背景',
          size: '200x200'
        },
      }
    },
    array: {
      type: 'array',
      title: '题目列表',
      items: {
        type: 'object',
        title: '填写一个题目',
        properties: {
          question: {
            type: 'string',
            title: '题目',
            size: 123,
          },
          pic: {
            type: 'integer',
            title: '图片',
          },
          answers: {
            type: 'array',
            title: '选项',
            items: {
              type: 'object',
              title: '选项列表',
              properties: {
                key: {
                  type: 'enum',
                  title: '选项名',
                  enum: [
                    { value: 'A', name: 'A'},
                    { value: 'B', name: 'B'},
                    { value: 'C', name: 'C'},
                    { value: 'D', name: 'D'},
                  ]
                },
                content: {
                  type: 'string',
                  title: '选项内容',
                },
                score: {
                  type: 'enum',
                  title: '跳转',
                  enum: [
                    { value: true, name: 'TRUE'},
                    { value: false, name: 'FALSE'},
                  ]
                }
              }
            }
          },
        }
      }
    }
  }
};
const data = {
  obj: {
    a1: '11111'
  },
  array: [
    {
      question: '1111111111',
      pic: '',
      answers: [
      ]
    },
  ]
};

const { Schema } = SchemaUtils;
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

  componentDidMount() {
    window._getData = () => {
      let data = this.refs.obj.getData();
      console.log(data);
    };
  }
  render() {
    return <div>
      <Schema ref="obj" schema={schema} data={data}/>
    </div>;
  }
};

//## init App
function initApp() {
  var container = document.getElementById('J_page');
  ReactDOM.render(
    <APP/>,
    container
  );
}
initApp();

