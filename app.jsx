import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import SchemaUtils from './src/index';

const schema = {
  type: 'object',
  title: '选择题的模板',
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
          title: '首页的背景'
        },
        question_bg: {
          type: 'string',
          format: 'image',
          title: '答题页的背景'
        },
      }
    },
    array: {
      type: 'array',
      title: '数组',
      items: {
        type: 'object',
        title: '数组中的一个元素',
        properties: {
          a1: {
            type: 'string',
            title: 'a1的'
          },
          subArr: {
            type: 'array',
            title: '题目',
            items: {
              type: 'object',
              title: '题目内容',
              properties: {
                percent: {
                  type: 'string',
                  title: '百分比',
                },
                content: {
                  type: 'string',
                  title: '问题详情',
                }
              }
            }
          }
        }
      }
    }
  }
};
const data = {
  obj: {
    a1: '11111'
  },
  array: [{},{},{}]
};

const { Schema } = SchemaUtils;
SchemaUtils.init();

class APP extends Component {
  render() {
    return <div className="rc-schema-editor">
      <h1>从来前端组件测试：</h1>
      <Schema ref="obj" schema={schema} data={data} tag="root" collapse={false}/>
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

