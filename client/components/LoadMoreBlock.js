import React, { Component } from 'react';
import '../static/scss/load-more-block.scss';


const LoadMoreBlock = ({isLoading,onClick})=>{
  return(
    <div className={"load-more-block "+ (isLoading?'-isloading':'')}>
      {isLoading
        ? <div className="load-more-block__loader">Загрузка....</div>
        : <div className="load-more-block__button"
          onClick={onClick} >
          Загрузить еще
        </div>
      }
    </div>
  );
};
export default LoadMoreBlock;
