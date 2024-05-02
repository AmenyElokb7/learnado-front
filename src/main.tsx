import './index.css'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import '../i18n.ts'
import ReactDOM from 'react-dom/client'

import App from './App'
import * as React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
