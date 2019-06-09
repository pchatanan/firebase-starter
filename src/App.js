import React from 'react'
import AppRouter from './components/routes';
import { withStoreContext } from './components/states/GlobalStore';

const App = props => {
  return <AppRouter />
}

export default withStoreContext(App)
