
import 'babel-polyfill';
import 'isomorphic-fetch';
import {polyfill} from 'es6-promise';
polyfill();
import 'normalize.css';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Store from './store/configureStore';
import socketEventsListeners from './actions/common/socketEvents';

import routes from './routes';
const store = Store();
socketEventsListeners(store);
render(
    <Provider store={store} >
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);




//_______________________________________________________
    /*
    const ws = new WebSocket("ws://localhost:8082");
    var sub = document.querySelector('#sub');
    var msg = document.querySelector('#msg');
    sub.onclick = function(e){
    e.preventDefault();
    console.log('sendmessage');
    ws.send(msg.value);
};

ws.onmessage=function(e){
console.warn(e.data);
};

var sub2 = document.querySelector('#sub2');
// document.forms.publish.onsubmit=function(e){
//     console.log('onsubmit')
//     e.preventDefault();
//     return false;
// }
var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
sub2.onclick=function(e){

console.info('sendmessage through LONG-POLLING');
var xhr = new XHR();
xhr.open('POST','/sendmessage',true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({message:msg.value}));

};

subscribe();

function subscribe(){
var xhr = new XHR();

xhr.open('GET','/subscribe?'+Math.random(),true);

xhr.onload=function(e){
console.info('ответ через LONG-POLLING  >>  ' + this.responseText);
subscribe();
};
xhr.onerror=xhr.onabort=function(){
setTimeout(subscribe,500);
};
xhr.send('');

}*/
