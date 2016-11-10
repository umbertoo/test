import React, { Component } from 'react';
import '../static/scss/channel-list.scss';
import map from 'lodash/map';
import autoBind from 'react-autobind';
import ChannelItem from './ChannelItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';

const SortableChannelItem = SortableElement(ChannelItem);

class ChannelList extends Component {
  render(){
    const {
      onCreateChannel, selected, onSelectChannel, onClickItemSettings,
      channelsWithNewMessages, order, channels
    } = this.props;
    return (
      <Scrollbars
        className="channel-list"
        // renderThumbVertical={props => <div {...props} className="message-list__thumb-vertical"/>}
        ref={c=>this.scrollView=c}>
        <div className="channel-list__body">
          <button onClick={onCreateChannel}>createChannel</button>
          {order.map((id,i)=>{
            const channel = channels[id];
            const hasNewMessages = channelsWithNewMessages.some(id=>id==channel.id);
              return <SortableChannelItem
                onClickItemSettings={onClickItemSettings}
                index={i}
                isSelected={selected==channel.id}
                onSelectChannel={onSelectChannel}
                key={channel.id}
                channel={channel}
                hasNewMessages={hasNewMessages}/>;
          })}
        </div>
      </Scrollbars>
    );
  }
}

export default SortableContainer(ChannelList);
