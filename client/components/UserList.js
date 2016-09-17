import React, { Component } from 'react';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import UserItem from './UserItem';
let src = "https://cdn.discordapp.com/avatars/103559217914318848/ab47f88aee909dadba7561387c081bb3.jpg";
class UserList extends Component {
    render(){
        let {users,usersOnline}=this.props;
        let list={};
        // if(users && usersOnline){
         list = map(usersOnline,id=>users[id]);
        // }
        return (
            <div className="user-list">
                UserList
                {/* {map(this.props.users,user=><div key={user.id}>{user.name}</div>)} */}
                {map(list,user=>
                    <UserItem key={user.id}
                      avatar={src}
                      name={user.name}
                      isOnline/>
                  )
              }
            </div>
        );
    }
}

export default UserList;
