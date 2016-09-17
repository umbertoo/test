import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import UserList from '../components/UserList';

class UserListContainer extends Component {

    render(){
        const {
            users, usersOnline
        } = this.props;
        return (
            <UserList users={users} usersOnline={usersOnline}/>
        );
    }
}

const mapStateToProps = (state) =>({
    users:state.entities.users.items,
    usersOnline:state.usersOnline.ids
});

export default connect(mapStateToProps, Actions)(UserListContainer);
