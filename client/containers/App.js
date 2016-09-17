import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class App extends Component {
    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        );
    }
}
export default App;
