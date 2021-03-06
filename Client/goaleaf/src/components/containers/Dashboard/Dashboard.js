import React, { Component } from 'react'
import './Dashboard.scss'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import MyHabits from './../MyHabits/MyHabits'

class Dashboard extends Component {
  render() {
    if (this.props.authenticated) {
    return (
      <div className="dashboard">
        <MyHabits />
      </div>
    ) } else return (
      <Redirect to='/help' />
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    userLogged: state.userLogged
  }
}

export default connect(mapStateToProps)(Dashboard);
