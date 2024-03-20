import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.tsx'
import './main.css'
import {RouterProvider} from "react-router-dom";
import {initRouter} from "./common/context/routes.ts";
import {Provider} from "react-redux";
import {initStore} from "./common/context/store.ts";
import DialogProvider from "./common/providers/dialog-provider.tsx";
import ToastProvider from "./common/providers/toast-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <DialogProvider>
          <ToastProvider>
              <Layout>
                  <Provider store={initStore}>
                      <RouterProvider router={initRouter}/>
                  </Provider>
              </Layout>
          </ToastProvider>
      </DialogProvider>
  </React.StrictMode>,
)
