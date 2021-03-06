import React, { Component } from 'react'
import './Auth.scss'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {

  state = {
    login: '',
    password: '',
    errorMsg: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.password === ''){
      this.setState({errorMsg: 'Please complete the form'});
      return;
    }

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
  render() {
      let errorMsg = <div className="error-msg">{ this.state.errorMsg }</div>

      if (!localStorage.getItem('token')){
    return (
      <div className="auth-container">
      <form className="auth-form" onSubmit={ this.handleSubmit } autoComplete="off">
        <h1 className="auth-title" > Log In </h1> 
          <input className="auth-input" maxLength="30" type="text" id="login" placeholder="login" onChange={ this.handleChange } />
          <input className="auth-input" maxLength="25" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
        { errorMsg }
          <div className="auth-buttons">
            <input className="auth-btn" type="submit" value="Log in" />
            <Link to='/signin'><input className="auth-btn" type="button" value="Sign in" /></Link>
          </div>
          <Link to='/reset-password' className="forgot-password">Forgot password?</Link>
      </form>
      </div>
    )} else {
      return <Redirect  to='/'/>
    }
  }
}

export default LogIn;
