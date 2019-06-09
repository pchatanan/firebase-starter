import React from 'react'
import { observer } from 'mobx-react';
import { useStore } from '../states/GlobalStore';
import * as firebase from 'firebase'

const ResetPasswordPage = props => {
  const store = useStore()
  return (<div>
    <form onSubmit={e => {
      firebase.auth().sendPasswordResetEmail(store.email)
        .then(() => {
          store.error = 'Reset email sent!'
          props.history.push('/login')
        })
        .catch(err => {
          store.error = err.message
        })
      e.preventDefault()
    }}>
      <label>Email</label>
      <input value={store.email} onChange={e => {
        store.email = e.target.value
      }}></input>
      <button type='submit'>Send email reset</button>
    </form>
  </div>)
}

export default observer(ResetPasswordPage)