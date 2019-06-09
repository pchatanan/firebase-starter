import React from 'react'
import { Link, Route } from 'react-router-dom'
import { routes } from '.';
import LoginPage from './LoginPage';

const NonAuthLandingPage = props => {
  return (<div>
    NonAuth
    <Link to={routes.LoginPage.path}><button>Login</button></Link>
    <Link to={routes.RegisterPage.path}><button>Register</button></Link>
  </div>)
}

export default NonAuthLandingPage