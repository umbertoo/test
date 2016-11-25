import React, { Component, PropTypes } from 'react';
import Button from '../components/Button';
import StepSlider from '../components/StepSlider';
import '../static/scss/add-server-form.scss';
import CreateServerForm from '../components/CreateServerForm';
import AddServerForm from '../components/AddServerForm';

class AddServerSteps extends Component {
  state = {
    step:1,
    bodyWidth:'',
    createWay: false,
    addWay:true
  }
  onClickCreate=()=>{
    console.log('onClickCreate');
    this.setState({ addWay: false , createWay: true},this.nextStep);
  }
  onClickAdd=()=>{
    console.log('onClickAdd');
    this.setState({ addWay: true , createWay: false},this.nextStep);
  }
  nextStep=()=>{
    this.setState({ step:2 });
  }
  prevStep=()=>{
    this.setState({ step:1 });
  }
  render(){
    const {bodyWidth, step, createWay, addWay}=this.state;
    return (
      <div ref={c=>this.form=c}
        className="add-server-form">

        <StepSlider step={step}>
          <div className="add-server-form__step1">
            <Button color={'#7289da'}
              onClick={this.onClickCreate}>Создать сервер</Button>
            <Button color={'#3ca374'}
              onClick={this.onClickAdd}>Присоедениться к серверу</Button>
          </div>
          {createWay ?
            <div className="add-server-form__step2">
              <CreateServerForm
                onSubmit={this.props.onSubmitCreateServer}
                cancelBtn={
                  <Button onClick={this.prevStep}>Назад</Button>
                }/>
            </div>
            : <div className="add-server-form__step2">
              <AddServerForm
                cancelBtn={
                  <Button onClick={this.prevStep}>Назад</Button>
                }/>
            </div>
          }
        </StepSlider>
      </div>
        );
      }
    }
    AddServerSteps.propTypes = {

    };
    export default AddServerSteps;
