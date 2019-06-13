import React from 'react'
import { useStore } from '../states/GlobalStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import { routes } from '.';
import * as firebase from 'firebase'
import { validateRegisterForm } from '../utils/validator';
import { Widget, Container } from 'simply-ui'

const RegisterPage = props => {
  const store = useStore()
  return (<Container.FlexBox styled={`
  height: 100%;
  overflow: auto;
`}>
    <Container.VerticalForm
      styled={`
        height: min-content;
      `} onSubmit={e => {
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
      <Container.FormItem>
        <Widget.Label>Email</Widget.Label>
        <Widget.Input value={store._email} onChange={e => {
          store._email = e.target.value
        }}></Widget.Input>
      </Container.FormItem>
      <Container.FormItem>
        <Widget.Label>Password</Widget.Label>
        <Widget.Input type='password' value={store._password1} onChange={e => {
          store._password1 = e.target.value
        }}></Widget.Input>
      </Container.FormItem>
      <Container.FormItem>
        <Widget.Label>Confirm Password</Widget.Label>
        <Widget.Input type='password' value={store._password2} onChange={e => {
          store._password2 = e.target.value
        }}></Widget.Input>
      </Container.FormItem>
      <Container.FormItem>
        <Widget.Button type='submit'>Register</Widget.Button>
      </Container.FormItem>
      <Container.FormItem>
        <Link to={routes.LoginPage.path}>Already have account?</Link>
      </Container.FormItem>
    </Container.VerticalForm>
  </Container.FlexBox>)
}

export default observer(RegisterPage)