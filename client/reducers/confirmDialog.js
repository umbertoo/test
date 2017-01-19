import type from '../actions/common/types';
import merge from 'lodash/merge';

const initialState = {
  show: false,
  text: null

};

export const confirmDialog = (state = initialState, action) => {

  switch (action.type) {
    case type.OPEN_CONFIRM:
    return {...state,
      show:true,
      text:action.text
    };
    case type.CONFIRM_YES:
    case type.CONFIRM_NO:
    return {...state,
      show:false,
      text:null
    };
    default: return state;
  }
};
