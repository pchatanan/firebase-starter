import React from 'react'
import { useStore } from '../states/GlobalStore';
import { observer } from 'mobx-react';
import { routes } from '.';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import { Widget, Container } from 'simply-ui'

const LoginPage = props => {
  const store = useStore()
  const [loggingIn, setLoggingIn] = React.useState(false)
  return (<Container.FlexBox styled={`
            height: 100%;
            overflow: auto;
          `}>
    <Container.VerticalForm
      styled={`
        height: min-content;
      `}
      onSubmit={e => {
        setLoggingIn(true)
        firebase.auth().signInWithEmailAndPassword(store.email, store.password)
          .then(() => {
            setLoggingIn(false)
            store.password = ''
          })
          .catch(err => {
            store.error = err.message
            setLoggingIn(false)
          })
        e.preventDefault()
      }}>
      <Container.FormItem>
        <Widget.Label htmlFor='email'>Email</Widget.Label>
        <Widget.Input id='email' disabled={loggingIn} value={store.email} onChange={e => {
          store.email = e.target.value
        }}></Widget.Input>
      </Container.FormItem>
      <Container.FormItem>
        <Widget.Label>Password</Widget.Label>
        <Widget.Input type='password' disabled={loggingIn} value={store.password} onChange={e => {
          store.password = e.target.value
        }}></Widget.Input>
      </Container.FormItem>
      <Container.FormItem>
        <Widget.Button type='submit' disabled={loggingIn}>{loggingIn ? 'authenticating...' : 'login'}</Widget.Button>
      </Container.FormItem>
      <Container.FormItem>
        <Link to={routes.RegisterPage.path}>Create new account</Link>
        <Link to={routes.ResetPasswordPage.path}>Forget password?</Link>
      </Container.FormItem>
    </Container.VerticalForm>
  </Container.FlexBox>)
}

export default observer(LoginPage)