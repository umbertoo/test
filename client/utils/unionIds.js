import union from 'lodash/union';
import isArray from 'lodash/isArray';

export default (a,b)=>{

  if(!isArray(b)){
    return union(a,[b]);
  }
  return union(a,b);

};
