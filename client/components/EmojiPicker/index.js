import React, { Component } from 'react';
import data  from './emoji.json';

import './css/emoji-picker.css';
import './fontello-cc7c6182/css/fontello.css';
import List from './components/List';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import keyBy from 'lodash/keyBy';
import autoBind from 'react-autobind';
import Velocity from 'velocity-animate';

import sprite from './images/sheet_apple_32.png';
// import sprite from './images/sheet_twitter_32.png';


const sortedData = sortBy(data, e=>e.sort_order );
const res = sortedData.map(({category,sheet_x,sheet_y,short_name})=>({category,sheet_x,sheet_y,short_name}));
const categoriesOrder = ["People", "Nature", "Foods",  "Activity", "Places", "Objects", "Symbols",  "Flags"   /*,  "Skin Tones"*/];

const tabsIcons= {
  People:{
    icon:'icon-smile'
  }, Nature:{
    icon:'icon-leaf-1'
  }, Foods:{
    icon:'icon-coffee'
  }, Activity:{
    icon:'icon-soccer-ball'
  }, Places:{
    icon:'icon-flight'
  }, Objects:{
    icon:'icon-lamp'
  }, Symbols:{
    icon:'icon-heart'
  },  Flags:{
    icon:'icon-flag-1'
  }   /*,  "Skin Tones"*/
};
let categories ={};

forEach(categoriesOrder, c=> categories[c] = res.filter(e=>e.category==c));

class EmojiPicker extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      serch_text:"",
      cats:categories,
      active_tab:'People',
      hover:false
    };
  }
  handleInputChange({target:{value}}){
    let cats = {};
    forEach(categories,(cat,key)=>
    cats[key]= cat.filter(e=>e.short_name.match(value)));
    this.setState({
      serch_text:value,
      cats
    });
  }
  handleTabClick(key){
    this.list.scrollTo(key);
    // this.setState({
    //     active_tab:key
    // });
  }
  onScrollCategory(key){
    this.setState({
      active_tab:key
    });
  }
  render(){
    const {itemSize}=this.props;
    const {serch_text,cats}=this.state;
    return (
      <div className="emoji-picker">
        <div className="emoji-picker__search">
          <input
            placeholder="search"
            className="emoji-picker__input"
            onChange={this.handleInputChange}
            value={serch_text}/>
        </div>
        <List
          onScrollCategory={this.onScrollCategory}
          ref={c=>this.list=c}
          categories={cats}
          categoriesOrder={categoriesOrder}
          onSelect={this.props.onSelect}/>
        <div className="emoji-picker__tabs">
          {map(tabsIcons,(cat,key)=>{
            const active = this.state.active_tab==key?' -active ':'';
            return (
              <span
                onClick={this.handleTabClick.bind(this,key)}
                key={key}
                className={"emoji-picker__tab "+cat.icon +active}/>);
          })}
        </div>
      </div>
      );
    }
  }
  export default EmojiPicker;
