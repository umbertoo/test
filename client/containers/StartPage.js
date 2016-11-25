import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class StartPage extends Component {
  onLogout() {
    console.log('onLogout');
    this.props.logoutUser();
  }
  render() {
    return (
      <div className="wrap">
        <div className="header">
          {this.props.isAuthenticated
            ? <span onClick={this.onLogout.bind(this)} className="btn">logout</span>
            : <div>
              <Link activeClassName="activea" to="login"> login </Link>
              <Link to="/signup"> signup </Link>
            </div>
          }
        </div>
        <div className="test">
          <span>
            {/* <IndexLink  activeClassName="activea" to="/"> HOME </IndexLink> */}
            <Link  activeClassName="activea" to="/channels/1/"> chat </Link>
            {/* <Link  activeClassName="activea" to="/page2"> page2 </Link>
            <Link activeClassName="activea" to="/page3"> page3 </Link> */}
            {this.props.test}
          </span>
        </div>
      </div>
    );}
  }
  const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.auth.isAuthenticated

  });
  export default connect(mapStateToProps, actions)(StartPage);
