import React, {Component} from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import {withRouter} from 'react-router';
import validator from 'validator';
import {some} from 'lodash/collection';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value:'',
                error:''
            },
            password: {
                value:'',
                error:''
            },
            email: {
                value:'',
                error:''
            },
            requiredAll:""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    setValue(e){
        let { name } = e.target;
        this.setState({[name]:{...this.state[name],value:this.refs[name].value},
            requiredAll:""

        });
    }
    onSubmit() {
        this.validateUserName();

        let {username, password, email} = this.state;

        if (some(this.state,e=>e.error)  ){
            console.log("есть ошибки");
            this.setState({
                requiredAll:""
            });

        }else if (some(this.state,e=>e.value=="")) {
            this.setState({
                requiredAll:"Заполнены не все поля"
            });
            console.log("заполнены не все поля");
        }else {
            this.setState({
                requiredAll:""
            });
            this.props.onSubmit({name: username.value, password:password.value, email:email.value});

        }
    }
    validatePassword(){
        let { value } = this.refs.password;
        let error = value?
        value.length < 3 ?"Пароль минимум 3 символа":""
        :"";
        this.setState({password:{...this.state.password,error}});
    }
    validateEmail(){
        let { value } = this.refs.email;
        let error = value?
        !validator.isEmail(value)?"Укажите действительный email":""
        :"";
        this.setState({email:{...this.state.email,error}});

    }
    validateUserName(e){
        let { value } = this.refs.username;
        let error = value?
        !validator.isAlphanumeric(value)?"Имя : только латинские буквы и цифры.":""
        :"";
        this.setState({username:{...this.state.username,error}});
    }
    render() {
        let {email, password, username, requiredAll} = this.state;
        return (
            <div className="signup-form">
                <div className="body-form">
                    <h1>Регистрация</h1>
                    <div className={"input-group "+(email.error?"invalid":"")}>
                        <label>Эл. почта</label>

                        <input placeholder="you@example.ru"
                            className={email.error && "invalid"}
                            onBlur={this.validateEmail.bind(this)}
                            onChange={this.setValue}
                            ref="email"
                            name="email"
                            type="email"/>

                    </div>
                    <div className={"input-group "+(password.error?"invalid":"")}>
                        <label>Пароль</label>

                        <input placeholder="*****"
                            className={password.error && "invalid"}
                            onBlur={this.validatePassword.bind(this)}
                            onChange={this.setValue}
                            ref="password"
                            name="password"
                            type="password"/>

                    </div>

                    <div className={"input-group "+(username.error?"invalid":"")}>
                        <label>Имя пользователя</label>
                        <input placeholder="Имя пользователя"
                            className={username.error && "invalid"}
                            onChange={this.setValue}
                            onBlur={e=>this.validateUserName(e)}
                            ref="username"
                            name="username"
                            type="text"/>

                    </div>
                    <div className={"error_list"}>
                        <TransitionGroup transitionName = "example" transitionEnterTimeout={900}
                            transitionLeaveTimeout={900}>
                            {email.error && <div key="email.error" className="error_block"><span>{email.error}</span></div>}
                            {password.error && <div key="password.error" className="error_block"><span>{password.error}</span></div>}
                            {username.error && <div key="username.error" className="error_block"><span>{username.error}</span></div>}
                            {requiredAll && <div key="username.error" className="error_block"><span>{requiredAll}</span></div>}
                        </TransitionGroup>
                    </div>
                    <input type="button" value="Зарегестрироваться" onClick={this.onSubmit}/>
                </div>

            </div>
        );
    }
}

export default withRouter(SignupForm);
