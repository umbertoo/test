import React, { Component } from 'react';
import map from 'lodash/map';

class RolesList extends Component {
  render(){
    const { roles, actions, resources, attributes, permissions } = this.props;
    // console.log(actions);
    console.log('actions',actions);

    return (<div>
      {map(roles, role=>
        <div key={role.id}>
          <div>
            name: {role.name}
          </div>
          <div>
            <b>inherits:</b>
            {role.inherits &&
              role.inherits.map(e=>
                <span key={e}>{roles[e].name}</span>)
            }
          </div>
          <div>
            <b>permissions:</b>
            {role.permissions &&
              role.permissions.map(e=>{
                const perm = permissions[e];
                if (perm) {
                  return <div key={e}>
                    name: {perm.name} <br/>
                    {perm.action && actions[perm.action].name}
                    : {perm.resource && resources[perm.resource].name}
                    : {perm.attribute && attributes[perm.attribute].name}
                    <hr/>
                  </div>;
                }else return null;
              }
              )
            }
          </div>
          <hr/>
        </div>
      )}
    </div>
      );
    }
  }

  export default RolesList;
