
export default function ConfirmDialogMiddleWare(){
  let watch=false;
  let persistedAction=null;

  return ({dispatch}) => next => action =>{
    if(!watch && action.type=='OPEN_CONFIRM' ){
      const {text, type}= action;
      persistedAction = action.actionCreator;
      watch=true;
      return next({type, text});
    }
    if(watch && action.type=='CONFIRM_YES'){
      watch=false;
      next(action);
      return dispatch(persistedAction());
    }
    if(watch && action.type=='CONFIRM_NO'){
      watch=false;
      persistedAction=null;
    }
    next(action);
  };
}
