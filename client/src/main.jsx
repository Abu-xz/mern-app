import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer theme='dark' />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
