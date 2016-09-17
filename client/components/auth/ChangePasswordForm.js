import React, { Component } from 'react';

class ChangePasswordForm extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.log = this.log.bind(this);
    }
    onChangeRepeatPassword(e){
        this.setState({
            repeatPassword:e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }
    log(){
        console.log('!!!!!');
    }
    onSubmit(){
        let {username, password} = this.state;
        this.props.onSubmit({username, password});
    }
    render() {
        console.log(this,this.log);
        return (
            <div className="login-form">
                Input new password
                <div className="input-group">
                    <label>Password</label>
                    <input onChange={this.onChangePassword} value={this.state.password}  type="text"/>
                    <label>Password repeat</label>
                    <input onChange={this.onChangeRepeatPassword} value={this.state.repeatPassword}  type="text"/>
                </div>
                <input type="button" value="Send" onClick={this.onSubmit}/>
            </div>
        );
    }
}

export default ChangePasswordForm;
