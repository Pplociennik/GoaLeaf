import React, { Component } from 'react'
import './Auth.scss'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class SignIn extends Component {

  state = {
    login: '',
    email: '',
    password: '',
    repeat_password: '',
    errorMsg: '',
    disableBtn: false
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.email.trim() === '' || this.state.password === '' || this.state.repeat_password === ''){
      this.setState({errorMsg: 'Please complete the form'});
      this.setState({disableBtn: false});
      return;
    }

    this.setState({errorMsg: 'waiting'})

    axios.post(`https://glf-api.herokuapp.com/register`, {
        "emailAddress": this.state.email,
        "login": this.state.login,
        "matchingPassword": this.state.repeat_password,
        "password": this.state.password,
        "userName": ""
      })
      .then(res => {
        axios.post('https://glf-api.herokuapp.com/login', {
          "Token": "",
          "login": this.state.login,
          "password": this.state.password
        })
        .then(res => {
                      localStorage.setItem('token', res.data);
                      window.location.reload();
                      this.props.history.push('/');
                     }
        ).catch(err => this.setState({errorMsg: err.response.data.message}))
    }
     ).catch(err => {
       this.setState({errorMsg: err.response.data.message});
       this.setState({disableBtn: false});
      });
  }

  handleDisableBtn = () => {
    this.setState({disableBtn: true});
  }

  render() {
      let errorMsg = <div className="error-msg">{ this.state.errorMsg }</div>
      if (this.state.errorMsg === 'waiting') {
        errorMsg = <div className="waiting-msg"></div>
      }

    if (!localStorage.getItem('token')){
    return (
      <div className="auth-container">
      <form className="auth-form" onSubmit={ this.handleSubmit } autoComplete="off">
        <h1 className="auth-title"> Sign In </h1>
          <input className="auth-input" maxLength="30" type="text" id="login" placeholder="login" onChange={ this.handleChange } /> 
          <input className="auth-input" maxLength="30" type="text" id="email" placeholder="email" onChange={ this.handleChange } />
          <input className="auth-input" maxLength="25" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
          <input className="auth-input" maxLength="25" type="password" id="repeat_password" placeholder="repeat password" onChange={ this.handleChange } />
        { errorMsg }
          <div className="auth-buttons">
            <input className={this.state.disableBtn ? "auth-btn disable-btn" : "auth-btn"} onClick={ this.handleDisableBtn } type="submit" value="Sign in" />
            <Link to='/login'><input className="auth-btn" type="button" value="Log in" /></Link>
          </div>
      </form>
      </div>
    )} else {
      return <Redirect  to='/'/>
    }
  }
}

export default SignIn;
