import './index.less';
import { Component, PropTypes } from 'react';
// import SchemaFile from './schema/file';
// import SchemaImage from './schema/image';
import SchemaInput from './schema/input';
import SchemaTable from './schema/array';
import SchemaObject from './schema/object';

import UIBox from './ui/box';

let SchemaMap = {
  'object+': SchemaObject,
  // 'string+file': SchemaFile,
  // 'string+image': SchemaImage,
  'string+': SchemaInput,
  'integer+': SchemaInput,
  'array+': SchemaTable,
};

let UIMap = {
  box: UIBox
};


module.exports =  {
  Schema: SchemaObject,
  getSchemaComp: (key, uniqueKey, schema, data, tag) => {
    let COMP = SchemaMap[key];
    if(COMP){
      return <COMP key={uniqueKey} ref={uniqueKey} schema={schema} data={data} tag={tag}/>;
    } else {
      return '';
    }
  },
  getUI: key => {
    return UIMap[key];
  },
  init: function(map) {
    let keys = Object.keys(SchemaMap);
    let utils = this;
    keys.forEach(key => {
      SchemaMap[key].Utils = utils;
    });

    if(!map) return;

    let newKeys = Object.keys(map);
    newKeys.forEach(key => {
      SchemaMap[key] = map[key];
      SchemaMap[key].Utils = utils;
    });
  }
};
