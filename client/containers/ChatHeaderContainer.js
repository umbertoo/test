import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import {withRouter} from 'react-router';
import '../static/scss/chat-header.scss';

class ChatHeaderContainer extends Component {
    render(){
        const {channels, params:{channel_id}} = this.props;
        return (
            <div className="chat-header">
                {channels[channel_id] && 
                    <h1 className="chat-header__title">{channels[channel_id].name}</h1>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    channels:state.entities.channels.items,
});

export default connect(mapStateToProps, Actions)(withRouter(ChatHeaderContainer));
