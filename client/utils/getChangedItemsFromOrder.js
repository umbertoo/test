export const getChangedItemsFromOrder = (oldIndex, newIndex, order)=>{
  const piece = oldIndex < newIndex
  ? order.slice(oldIndex, newIndex+1)
  : order.slice(newIndex, oldIndex+1);

  let index = oldIndex < newIndex
  ? oldIndex
  : newIndex;

  return piece.map(e=>({id:e, order: ++index}));
};
