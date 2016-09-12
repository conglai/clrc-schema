import { Component, PropTypes } from 'react';
// import SchemaFile from './schema/file';
import SchemaImage from './schema/image';
import SchemaInput from './schema/input';
import SchemaEnum from './schema/enum';
import SchemaTable from './schema/array';
import SchemaObject from './schema/object';

import Schema  from './schema';
import UIBox from './ui/box';
import WarningText from './ui/warning-text';

let SchemaMap = {
  'object+': SchemaObject,
  // 'string+file': SchemaFile,
  'string+image': SchemaImage,
  'string+': SchemaInput,
  'integer+': SchemaInput,
  'enum+': SchemaEnum,
  'array+': SchemaTable,
};

let UIMap = {
  box: UIBox,
  'warning-text': WarningText
};


module.exports =  {
  Schema: SchemaObject,
  getSchemaComp: key => {
    let COMP = SchemaMap[key];
    return COMP;
  },
  getUI: key => {
    return UIMap[key];
  },
  isInline: schema => {
    let keys = Object.keys(schema.properties);
    let inline = true;
    keys.forEach(key => {
      let { type } = schema.properties[key];
      if(type === 'object' || type === 'array') {
        inline = false;
      }
    });
    return inline;
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
