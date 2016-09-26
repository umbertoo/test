// var kk = {ds:'hello', change(value){this.ds= value}};
//
// module.exports=kk;

// /////////////
// import ReactDOM from 'react-dom';
//
// var samplestore = require('./SampleStore');
//
// const app = document.getElementById('root');
//
// ReactDOM.render(<Home />, app);
//
// exports.samplestore = samplestore
import React, { Component } from 'react';

class Some extends Component {

    zz(e,i){
        return <span key={i}>{e} {this.props.ll}</span>;
    }
    render(){
        return (<div>{[1,3,4,5,6,7,8].map(this.zz)}</div>);
    }
}

export default Some;
