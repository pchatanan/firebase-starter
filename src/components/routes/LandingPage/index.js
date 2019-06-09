import React from 'react'
import { useStore } from '../../states/GlobalStore'
import EmailNotVerified from './EmailNotVerified'

const LandingPage = props => {
  const store = useStore()
  if (store.isAuth) {
    if (store.user.data.emailVerified) {
      return (<div>
        Auth Landing Page
      </div>)
    }
    else {
      return <EmailNotVerified />
    }
  }
  return (<div>
    NonAuthLandingPage
  </div>)
}

export default LandingPage