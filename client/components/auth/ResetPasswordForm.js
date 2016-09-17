import React, {Component} from 'react';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }
    onSubmit() {
        let {username, password} = this.state;
        this.props.onSubmit({username, password});
    }
    render() {
        return (
            <div className="login-form">
                We will send you an email with instructions on how to reset your password
                <div className="input-group">
                    <label>Email</label>
                    <input onChange={this.onChangeEmail} value={this.state.email} type="text"/>
                </div>
                <input type="button" value="Send" onClick={this.onSubmit}/>
            </div>
        );
    }
}

export default ResetPasswordForm;
