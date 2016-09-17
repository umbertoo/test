import React, { Component } from 'react';
import moment from 'moment';
import Remarkable  from 'remarkable';
import emojione from 'emojione';
import '../static/scss/message-block.scss';
import jdenticon from 'jdenticon';
import Identicon from 'identicon.js';
import emojify from 'emojify.js';
// import EmojiConvertor from 'js-emoji-fork';
import {EmojiConvertor} from './EmojiPicker/emoji.min';
import sheet from './EmojiPicker/images/sheet_apple_32.png';
// import sheet from './EmojiPicker/images/sheet_twitter_32.png';
import shallowEqual from 'shallowequal';
class Message extends Component {
    constructor(props){
        super(props);
        this.rawMarkup= this.rawMarkup.bind(this);
        this.md = new Remarkable('full', {
            html: true
        });
        this.emoji=new EmojiConvertor();
        this.emoji.use_sheet = true;
        this.emoji.img_sets.apple.sheet = sheet;

    }
    shouldComponentUpdate(nextProps, nextState){
        return !shallowEqual(this.props.text, nextProps.text);
    }
    rawMarkup() {
        const markup = this.emoji.replace_colons(this.props.text);
        return { __html: this.md.render(markup) };
    }
    render(){
        let {user , minimaized} = this.props;
        let date = moment(this.props.createdAt).calendar();
        moment.locale('ru');
        // console.log('Message render');
        return (
            <div className={"message-block "+ (minimaized?'-minimaized':'')}>
                {!minimaized  &&  <div className="message-block__avatar">
                    avatar
                    {
                        // <img src={"data:image/png;base64," + new Identicon(user.name+''+user.createdAt+user.email,  {
                        //
                        //     margin: 0,
                        //     size: 36s
                        // }).toString()}/>
                    }
                </div>}
                <div className="message-block__body ">
                    {!minimaized &&
                        <div className="message-block__head">
                            <span className="message-block__username">
                                {this.props.user.name}
                            </span>
                            <span className="message-block__date">
                                {date}
                            </span>
                        </div>
                    }
                    <span className="message-block__content" dangerouslySetInnerHTML={this.rawMarkup()}></span>
                </div>

            </div>
        );
    }
}

export default Message;
