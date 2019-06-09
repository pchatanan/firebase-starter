import React from 'react'
import { useStore } from '../states/GlobalStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import { routes } from '.';
import * as firebase from 'firebase'
import { validateRegisterForm } from '../utils/validator';

const RegisterPage = props => {
  const store = useStore()
  return (<div>
    <form onSubmit={e => {
      validateRegisterForm(store._email, store._password1, store._password2)
        .then(() => {
          firebase.auth().createUserWithEmailAndPassword(store._email, store._password1)
            .then(userCredential => {
              var { user } = userCredential
              store.emailVerification = {
                isSending: true,
                lastSent: null
              }
              return user.sendEmailVerification()
            })
            .then(() => {
              store.error = 'sent'
              store.emailVerification = {
                isSending: false,
                lastSent: Date.now()
              }
            })
            .catch((err) => {
              store.error = err.message
            })
        })
        .catch(er => {
          store.error = er.message
        })
      e.preventDefault()
    }}>
      <label>Email</label>
      <input value={store._email} onChange={e => {
        store._email = e.target.value
      }}></input>
      <label>Password</label>
      <input type='password' value={store._password1} onChange={e => {
        store._password1 = e.target.value
      }}></input>
      <label>Confirm Password</label>
      <input type='password' value={store._password2} onChange={e => {
        store._password2 = e.target.value
      }}></input>
      <button type='submit'>Register</button>
    </form>
    <Link to={routes.LoginPage.path}>Already have account?</Link>
  </div>)
}

export default observer(RegisterPage)