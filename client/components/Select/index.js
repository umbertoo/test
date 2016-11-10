import React, { Component, PropTypes as PT } from 'react';
import autoBind from 'react-autobind';
import DropDown from '../DropDown';
import OptionsList from './OptionsList';
import Control from './Control';
import CreateButton from './CreateButton';
import Menu from './Menu';
import Tether from 'react-tether';
import Input from 'react-input-autosize';
import './scss/xselect.scss';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

class Select extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      isOpen:false,
      menuWidth:200,
      text:'',
      value:props.value
    };
    this.getFilteredOptions = debounce(this.getFilteredOptions,50,{
      'leading': true,
      'trailing': true
    });
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.value!==this.state.value){
        this.setState({
            value:nextProps.value
        });
      }
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickDocument);
    this.setState({ menuWidth: this.control.offsetWidth });
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickDocument);
  }
  handleClickDocument(e){
    let target = e.target;
    while (target) {
      if(target == this.control) return false;
      target = target.parentNode;
    }
    this.setState({ isOpen: false, text:'' });
  }
  onSelectOption(data){
    if(data.value==this.state.value) return;
    this.setState({ value:data.value },()=>{
      this.props.onChange(data);
    });
  }
  onInputChange(e){
    this.setState({ text:e.target.value });
  }
  handleOpen(e){
    this.setState({ isOpen: true });
  }
  setFocus(){
    this.input.focus();
  }
  getLabel(value, options){
    if(!value) return '';
    const option = options.find(e=>e.value==value);
    return option.label;
  }
  getFilteredOptions(options,text){
    return options.filter(e=>e.label.match(text));
  }
  onClickCreate(){
    this.props.onCreate({value:this.state.text});
  }
  onDeleteOption(option){
    this.props.onDeleteOption(option.value);
  }
  onClickClear(e){
    e.stopPropagation();
    this.setState({
        value:null,
        isOpen:false
    },()=>{
      this.props.onChange({value:null});
    });
  }
  renderControl(){
    const { menuWidth, text, value } = this.state;
    const { options, clearable } = this.props;
    const filteredOptions = text
    ? this.getFilteredOptions(options,text)
    : options;
    return (
      <div className="xselect__control"
        onClick={this.setFocus}
        onMouseDown={this.handleOpen}
        ref={c=>this.control=c}>
        <Input
          ref={c=>this.input=c}
          className="xselect__input"
          onChange={this.onInputChange}
          type="text"
          value={text} />
        {!text &&
          <div className="xselect__value">
            {this.getLabel(value, options)}
          </div>
        }
        {clearable &&
          <div className="xselect__clear-btn"
            onClick={this.onClickClear}>
            ×
          </div>
        }
        <div className="xselect__arrow-place">
          <div className="xselect__arrow"/>
        </div>
      </div>
    );
  }
  renderMenu(){
    const { menuWidth, text, value } = this.state;
    const { options} = this.props;
    const filteredOptions = text
    ? this.getFilteredOptions(options,text)
    : options;
    return (
      <div className="xselect__menu"
        style={{width: menuWidth+'px'}}>
        {text &&
          <div className="xselect__create-btn"
            onClick={this.onClickCreate}>
            Создать "{text}"
          </div>
        }
        <OptionsList
          deletableOptions={this.props.deletableOptions}
          selecteValue={value}
          onSelect={this.onSelectOption}
          onDelete={this.onDeleteOption}
          options={filteredOptions}/>
      </div>
    );
  }
  render(){
    const openClass = this.state.isOpen ? '-open' : '';
    const { options, clearable, deletableOptions } = this.props;
    const { menuWidth, text, value } = this.state;

    const filteredOptions = text
        ? this.getFilteredOptions(options,text)
        : options;
    return (
      <div className={"xselect "+openClass}>
        <Tether attachment={'top left'} targetAttachment={'bottom left'} >
          <Control
            onClick={this.setFocus}
            onMouseDown={this.handleOpen}
            value={this.getLabel(value, options)}
            clearable={clearable}
            onClickClear={this.onClickClear}
            refBlock={c=>this.control=c}
            showValue={!text} >
            <Input
              ref={c=>this.input=c}
              className="xselect__input"
              onChange={this.onInputChange}
              type="text"
              value={text} />
          </Control>
          {this.state.isOpen &&
            <Menu
              deletableOptions={deletableOptions}
              width={menuWidth}
              selectedValue={value}
              onSelect={this.onSelectOption}
              onDelete={this.onDeleteOption}
              options={filteredOptions} >
              {text &&
                <CreateButton text={text}
                  onClick={this.onClickCreate}/>
              }
            </Menu>
          }
        </Tether>
      </div>

    );
  }
}

{/* <div className={"xselect "+openClass}>
  <Tether attachment={'top left'} targetAttachment={'bottom left'} >
    <Control
      onClick={this.setFocus}
      onMouseDown={this.handleOpen}
      value={this.getLabel(value, options)}
      clearable={clearable}
      onClickClear={this.onClickClear}
      ref={c=>this.control=c}
      onInputChange={this.onInputChange}>
      <Input
        ref={c=>input=c}
        className="xselect__input"
        onChange={onInputChange}
        type="text"
        value={inputValue} />
    </Control>
    {this.state.isOpen &&
      <Menu
        deletableOptions={this.props.deletableOptions}
        width={menuWidth}
        showCreateBtn={!!text}
        createBtnText={text}
        selectedValue={value}
        onSelect={this.onSelectOption}
        onDelete={this.onDeleteOption}
        options={filteredOptions}
        />
    }
  </Tether>
</div> */}
Select.defaultProps = {
  clearable:true,
  deletableOptions:false,
  value:null,
  options:[]
};
Select.propTypes = {
  clearable: PT.bool,
  deletableOptions: PT.bool,
  onDeleteOption: PT.func,
  onCreate: PT.func,
  onChange: PT.func.isRequired,
  options: PT.arrayOf(
    PT.shape({
    label: PT.string,
    value: PT.oneOfType([
      PT.string,
      PT.number
    ])
  })).isRequired
};
export default Select;
