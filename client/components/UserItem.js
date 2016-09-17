import React, { Component } from 'react';
import '../static/scss/user-item.scss';

class UserItem extends Component {
    render(){
        return(
            <div className="user-item">
                <div
                  style={{backgroundImage:`url(${this.props.avatar})`}}
                  className="user-item__avatar">
                </div>
                <div className="user-item__name">{this.props.name}</div>
                <div className="user-item__indicator">{this.props.isOnline}</div>
            </div>
        );
    }
}

export default UserItem;
