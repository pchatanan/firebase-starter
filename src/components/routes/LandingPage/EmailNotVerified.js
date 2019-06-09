import React from 'react'
import * as firebase from 'firebase'
import { useStore } from '../../states/GlobalStore';
import { observer } from 'mobx-react';

const CountDownButton = observer(props => {
  const [count, setCount] = React.useState(props.milli)
  const store = useStore()
  var task = null
  React.useEffect(() => {
    task = setTimeout(() => {
      setCount(count - 1000)
    }, 1000)
    return () => {
      clearTimeout(task)
    }
  })
  if (count < 0) {
    clearTimeout(task)
    return <button onClick={e => {
      store.emailVerification = {
        isSending: true,
        lastSent: null
      }
      store.user.data.sendEmailVerification()
        .then(() => {
          store.emailVerification = {
            isSending: false,
            lastSent: Date.now()
          }
        })
        .catch(err => {
          store.emailVerification = {
            isSending: false,
            lastSent: null
          }
          store.error = err.message
        })
    }}>Send Verification Email</button>
  }
  return <button>{count}</button>
})

const SendEmailButton = observer(props => {
  const store = useStore()
  const { isSending, lastSent } = store.emailVerification
  if (isSending) {
    return <button disabled>Sending...</button>
  }
  else {
    var diff = Date.now() - lastSent
    return <CountDownButton milli={30000 - diff} />
  }
})

const EmailNotVerified = props => {
  const store = useStore()

  return (<div>
    <button onClick={e => {
      store.user.data.reload()
        .then(() => {
          store.user = {
            isLoading: false,
            data: firebase.auth().currentUser
          }
        })
    }}>Refesh</button>
    <SendEmailButton />
    <button onClick={e => {
      firebase.auth().signOut()
        .then(() => {
          store.error = 'logout successfully'
        })
        .catch(err => {
          store.error = err.mssage
        })
    }}>Logout</button>
    <button onClick={e => {
      store.user.data.delete()
        .then(() => {
          store.error = 'Account deleted.'
        })
        .catch(err => {
          store.error = err.message
        })
    }}>Delete account</button>
  </div>)
}

export default observer(EmailNotVerified)