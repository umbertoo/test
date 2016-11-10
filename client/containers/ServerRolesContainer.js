import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import autoBind from 'react-autobind';
import Tabs from '../components/Tabs';
import Tab from '../components/Tabs/Tab';
import {withRouter} from 'react-router';

class ServerRolesContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
    };
  }
  componentWillMount(){
    console.log('ServerRolesContainer');
      this.props.fetchRoles(this.props.params.serverId);
  }
  onChange(e){
    console.log(e,'onChange');
  }
  render(){
    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'400px'
    };
    return (<div>  <h1>Роли12</h1>
      <Tabs onChange={this.onChange} >


        <Tab label="1" style={tabPaneStyle}>
          <h1>1</h1>

        </Tab>
        <Tab label="2" style={tabPaneStyle}>
          <h1>2</h1>
        </Tab>
      </Tabs>
    </div>);
  }
}

const mapStateToProps = (state) =>({
roles:state.entities.channels.items,
});
// const mapStateToProps = (state) =>{
//   console.log(state.ui.selectedServer,'state.ui.selectedServer');
//   const server  = state.pagination.idsByServer[state.ui.selectedServer];
//   const {
//     ids = []
//   } = server||{};
//   console.log(server,'server');
//   console.log(ids,'ids');
//   return {
//     channelsWithNewMessages:state.entities.channels.channelsWithNewMessages,
//     channels:state.entities.channels.items,
//     order:ids
//   };
// };
export default withRouter(connect(mapStateToProps, Actions)(ServerRolesContainer));
