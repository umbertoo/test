import React, { Component } from 'react';
import '../static/scss/channel-list.scss';
import map from 'lodash/map';
import autoBind from 'react-autobind';

class ChannelList extends Component {
    constructor(props){
        super(props);
        autoBind(this);
    }
    render(){
        let {onCreateChannel, selected, onSelectChannel,channelsWithNewMessages } = this.props;
        // console.log('selectedChannel',selected);
        // console.log('channelsWithNewMessages',this.props.channelsWithNewMessages);
        return (
            <div className="channel-list">
                {/* <button onClick={onCreateChannel}>createChannel</button> */}
                {/* ChannelList */}
                {map(this.props.channels,channel=>{
                    const hasNewMessages = channelsWithNewMessages.some(id=>id==channel.id);
                        return (<div className={"channel-list__item " + (selected==channel.id?"-active":'')}
                          onClick={onSelectChannel.bind(this,channel)}
                          key={channel.id}>{channel.name}  <br/>{hasNewMessages && "есть сообщения"}</div>);
                }
                )}


            </div>
        );
    }
}

export default ChannelList;
