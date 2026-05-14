import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';

import { Provider } from "react-redux"
import store from "./store"

import { AuthProvider } from "./context/AuthContext"

initializeFaro({
  url: 'https://alternate-penguin-tested-ser.trycloudflare.com', // URL นี้คือตัวรับข้อมูลที่คุณต้องรันเพิ่ม
  app: {
    name: 'my-frontend-ts',
    version: '1.0.0',
    environment: 'production'
  },
  instrumentations: [
    ...getWebInstrumentations(),
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)