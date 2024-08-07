import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reset-css'
import '@/assets/style/global.scss'
import 'virtual:uno.css'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
)
