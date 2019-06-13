import React from 'react'
import { useStore } from '../states/GlobalStore';
import { Link } from 'react-router-dom'
import { routes } from '../routes';
import * as firebase from 'firebase'

const TopNavBar = props => {
  const store = useStore()
  if (store.isAuth) {
    if (store.user.data.emailVerified) {
      return (<div>
        <button onClick={e => {
          firebase.auth().signOut()
        }}>Logout</button>
      </div>)
    }
    else {
      return (<div>
        No Nav Bar: Your email is not verified.
      </div>)
    }

  }
  else {
    return (<div>
      <Link to={routes.LandingPage.path}><button>Home</button></Link>
      <Link to={routes.LoginPage.path}><button>Login</button></Link>
      <Link to={routes.RegisterPage.path}><button>Register</button></Link>
    </div>)
  }

}

export default TopNavBar