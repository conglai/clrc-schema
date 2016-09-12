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
      title: '题目列表',
      items: {
        type: 'object',
        title: '填写一个题目',
        properties: {
          question: {
            type: 'string',
            title: '题目',
          },
          pic: {
            type: 'string',
            title: '图片',
            format: 'image'
          },
          answers: {
            type: 'array',
            title: '选项',
            items: {
              type: 'object',
              title: '选项列表',
              properties: {
                key: {
                  type: 'string',
                  title: '选项名：A,B,C,D'
                },
                content: {
                  type: 'string',
                  title: '选项内容',
                },
                score: {
                  type: 'integer',
                  title: '分值'
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
    {},
  ]
};

const { Schema } = SchemaUtils;
SchemaUtils.init();

class APP extends Component {
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

