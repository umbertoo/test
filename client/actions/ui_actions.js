import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";


export const toggleModal = (modalName) =>({
    type:type.TOGGLE_MODAL,
    modalName
});
