import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import * as firebase from 'firebase'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { useStore } from '../states/GlobalStore';
import TopNavBar from '../nav/TopNavBar';
import LandingPage from './LandingPage';
import ResetPasswordPage from './ResetPasswordPage';
import { Widget, Main } from 'simply-ui'

export const secureAuth = (Component, isAuth) => props => {
  const store = useStore()
  if (store.isAuth === isAuth) {
    return <Component {...props} />
  }
  return <Redirect to={routes.LandingPage.path} push />
}

export const routes = {
  LandingPage: {
    path: '/',
    component: LandingPage
  },
  LoginPage: {
    path: '/login',
    component: secureAuth(LoginPage, false)
  },
  RegisterPage: {
    path: '/register',
    component: secureAuth(RegisterPage, false)
  },
  ResetPasswordPage: {
    path: '/reset_password',
    component: secureAuth(ResetPasswordPage, false)
  }
}

const AppRouter = props => {
  console.log('router')
  const store = useStore()
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      store.user = {
        isLoading: false,
        data: user
      }
    })
  }, [])
  if (store.user.isLoading) {
    return (<div>Authenticating...</div>)
  }
  return (<BrowserRouter>
    <Main.NavBarContainer>
      <TopNavBar />
    </Main.NavBarContainer>
    <Main.ContentContainer>
      {Object.values(routes).map((r, index) => <Route exact path={r.path} component={r.component} key={index} />)}
    </Main.ContentContainer>
    <Main.ErrorContainer show={store.error != null}>
      <span>{store.error}</span>
      <Widget.Button onClick={e => {
        store.error = null
      }}>dismiss</Widget.Button>
    </Main.ErrorContainer>}
  </BrowserRouter>)
}

export default observer(AppRouter)