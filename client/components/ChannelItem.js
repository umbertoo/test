import React, { PropTypes } from 'react';

const ChannelItem = ({
  hasNewMessages, isSelected, onSelectChannel, channel,
  onClickItemSettings
}) => {
  const onClickSettings = (e)=>{
    e.stopPropagation();
    onClickItemSettings(channel);
  };
  return (
    <div className={"channel-list__item " + (isSelected?"-active":'')}
      onClick={onSelectChannel.bind(this,channel)}
      key={channel.id}>
      {channel.name}
      <br/>
      {hasNewMessages && "есть сообщения"}
      <div onClick={onClickSettings} className="channel-list__settings-btn">
        S
      </div>
    </div>
  );
};
ChannelItem.propTypes = {
  hasNewMessages:PropTypes.bool,
  isSelected:PropTypes.bool,
  onSelectChannel:PropTypes.func,
  onClickItemSettings:PropTypes.func,
  channel:PropTypes.object
};
export default ChannelItem;
