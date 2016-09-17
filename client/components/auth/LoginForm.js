import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            value: 1
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }
    onChangePassword(e) {
        this.setState({password: e.target.value});
    }
    onSubmit() {
        let {email, password} = this.state;
        this.props.onSubmit({email, password});
    }
    render() {
        return (
            <div className="login-form">
                <h1>LoginPage</h1>
                <div className="input-group">
                    <label>email</label>
                    <input className="test2"
                        onChange={this.onChangeEmail}
                        value={this.state.email} type="email"/>
                </div>

                <div className="input-group">
                    <label>password</label>
                    <input onChange={this.onChangePassword}
                        value={this.state.password} type="password"/>
                </div>

                <div className="input-group"
                    onClick={this.props.onClickForgotPassword}>

                    Forgot the password?</div>
                <input className="aaa" type="button" value="login"
                    onClick={this.onSubmit}/>

            </div>
        );
    }
}

export default LoginForm;
