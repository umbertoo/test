import React, { Component, PropTypes } from 'react';
import '../static/scss/channel-list.scss';
import map from 'lodash/map';
import autoBind from 'react-autobind';
import ChannelItem from './ChannelItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

const SortableChannelItem = SortableElement(ChannelItem);

const ChannelList = ({
  onCreateChannel, onSelectChannel, onClickItemSettings,
  selected, channelsWithNewMessages, order, channels, children
}) => {
  return (
    <Scrollbars className="channel-list" >
      <div className="channel-list__body">
        {children}
        <div className="channel-list__header">
          <div className="channel-list__title">
            Каналы
          </div>
          <button
            className="channel-list__add-btn"
            onClick={onCreateChannel}>+</button>

        </div>
        {order.map((id,i)=>{
          const channel = channels[id];
          const hasNewMessages = channelsWithNewMessages.some(id=>id==channel.id);
            return <SortableChannelItem
              key={channel.id}
              onClickItemSettings={onClickItemSettings}
              index={i}
              isSelected={selected==channel.id}
              onSelectChannel={onSelectChannel}
              channel={channel}
              hasNewMessages={hasNewMessages}/>;
        })}
      </div>
    </Scrollbars>
    );
  };
ChannelList.propTypes={
  onCreateChannel:PropTypes.func,
  onClickItemSettings:PropTypes.func,
  onSelectChannel:PropTypes.func,
};
  export default SortableContainer(ChannelList);
