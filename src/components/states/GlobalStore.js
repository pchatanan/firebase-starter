import React from 'react'
import { observable, computed, action, autorun, decorate, observe } from 'mobx'


class GlobalStore {
  //Global
  error = null
  //LoginPage
  email = ''
  password = ''
  //RegisterPage
  _email = ''
  _password1 = ''
  _password2 = ''
  emailVerification = {
    isSending: false,
    lastSent: null
  }

  //Auth
  user = {
    isLoading: true,
    data: null
  }
  get isAuth() {
    return !this.user.isLoading && this.user.data != null
  }
}

export default decorate(GlobalStore, {
  error: observable,
  email: observable,
  password: observable,
  _email: observable,
  _password1: observable,
  _password2: observable,
  emailVerification: observable,
  user: observable,
  isAuth: computed
})

const StoreContext = React.createContext(new GlobalStore())

export const withStoreContext = Component => props => {
  return <StoreContext.Provider value={new GlobalStore()}>
    <Component {...props} />
  </StoreContext.Provider>
}

export const useStore = () => {
  return React.useContext(StoreContext)
}
