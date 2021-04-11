// Credits to Christian Johansen for util logic:
// https://github.com/cjohansen/react-sweeper

import { List, Map, fromJS, get } from 'immutable';

function partition(size, coll) {
  var res = [];
  for (var i = 0, l = coll.size || coll.length; i < l; i += size) {
    res.push(coll.slice(i, i + size));
  }
  return fromJS(res);
}

function identity(v) {
  return v;
}

function prop(n) {
  return function (object: Map<any, any>) {
    return object instanceof Map ? object.get(n) : object[n];
  };
}

function keep(list, pred) {

  return list.map(pred).filter(identity);
}

function repeat(n, val) {
  const res = [];
  while (n--) {
    res.push(val);
  }
  return res;
}

function shuffle(list) {
  return list.sort(function () { return Math.random() - 0.5; });
}

export {partition, identity, prop, keep, repeat, shuffle};
