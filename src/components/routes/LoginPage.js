import React from 'react'
import { useStore } from '../states/GlobalStore';
import { observer } from 'mobx-react';
import { routes } from '.';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

const LoginPage = props => {
  const store = useStore()
  return (<div>
    <form onSubmit={e => {
      firebase.auth().signInWithEmailAndPassword(store.email, store.password)
      e.preventDefault()
    }}>
      <label>Email</label>
      <input value={store.email} onChange={e => {
        store.email = e.target.value
      }}></input>
      <label>Password</label>
      <input type='password' value={store.password} onChange={e => {
        store.password = e.target.value
      }}></input>
      <button type='submit'>Submit</button>
    </form>
    <Link to={routes.RegisterPage.path}>Create new account</Link>
    <Link to={routes.ResetPasswordPage.path}>Forget password?</Link>
  </div>)
}

export default observer(LoginPage)