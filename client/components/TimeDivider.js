import React from 'react';
import '../static/scss/time-divider.scss';


const TimeDivider = ({content})=>{
    return (
        <div className="time-divider" >
            <span>{content}</span>
        </div>
    );
};


export default TimeDivider;
