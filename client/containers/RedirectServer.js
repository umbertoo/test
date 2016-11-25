import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getGeneralChannelId} from '../selectors/selectors.js';
import Redirect from 'react-router/Redirect';



// const RedirectServer = ({
//   generalChannelId, params:{serverId, channelId},
// })=>{
//   console.log('RedirectServer',channelId, generalChannelId);
//   return (
//     (!channelId && generalChannelId)
//     ? <Redirect to={'/channels/'+serverId+'/'+generalChannelId}/>
//     : null
//   );
// };

class RedirectServer extends Component {
  static contextTypes = { router: PropTypes.object.isRequired }

  componentWillReceiveProps(nextProps){
      if(nextProps.params.channelId){}
  }
  componentDidMount(){
    // const {
    //   generalChannelId, params:{serverId, channelId},
    // } = this.props;
    // if (!channelId && generalChannelId) this.context.router.transitionTo('/channels/'+serverId+'/'+generalChannelId);

  }
  componentDidUpdate(prevProps, prevState){
  }
  render(){
    const {
      generalChannelId, serverId, channelId,
    } = this.props;
    console.log('RedirectServer', channelId, generalChannelId);
    return (
      (!channelId && generalChannelId)
      ? <Redirect to={'/channels/'+serverId+'/'+generalChannelId}/>
      : null
    );
  }
}
 const mapStateToProps = (state) => {
   let generalChannelId =null;
   const {serverId,channelId} = state.ui.params;
  if(state.entities.servers.items[serverId]){
    generalChannelId = getGeneralChannelId(state, props);
  }
  return {
    serverId,channelId,
    generalChannelId
  };
};
export default connect(mapStateToProps,null)(RedirectServer);
