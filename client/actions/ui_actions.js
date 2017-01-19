import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";


export const addConfirmation = (actionCreator, text)=>
(...args) => ({
  type:type.OPEN_CONFIRM,
  text,
  actionCreator:actionCreator.bind(null, ...args)
});


export const confirmYes = () =>({
  type:type.CONFIRM_YES 
});
export const confirmNo = () =>({
  type:type.CONFIRM_NO
});


export const toggleModal = (modalName) =>({
    type:type.TOGGLE_MODAL,
    modalName
});

export const windowBlur = (channelId) =>({
    type:type.WINDOW_BLUR,
    channelId
});
