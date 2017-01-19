import React, {PropTypes,Component} from 'react';
import '../static/scss/messages-divider.scss';


class MessagesDivider extends Component {
    render(){
      const {content, textColor, lineColor, ref}=this.props;
        const style = {
          borderColor: lineColor
        };
        return (
          <div ref={this.props.refz} className={"messages-divider"} style={style}>
            <span style={{color:textColor}}>{content}</span>
          </div>
        );


    }
}

// const MessagesDivider = ({content, textColor, lineColor, ref})=>{
//   const style = {
//     borderColor: lineColor
//   };
//   return (
//     <div ref={ref} className={"messages-divider"} style={style}>
//       <span style={{color:textColor}}>{content}</span>
//     </div>
//   );
// };

MessagesDivider.propTypes={
  textColor:PropTypes.string,
  lineColor:PropTypes.string,
  content:PropTypes.string
};
MessagesDivider.defaultProps={
  textColor:null,
  lineColor:null,
  content:'Divider'
};

export default MessagesDivider;
