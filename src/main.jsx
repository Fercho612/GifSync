import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/Root.jsx'
import ErrorPage from './error-page'
import GifElements, { loader as gifLoader,}  from './routes/gif.jsx'
import EditGif, { action as editAction } from "./routes/editGif";
import ConfirmDelete, { action as destroyAction } from "./routes/destroy";

const route = createBrowserRouter ([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, 
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        path: "gifs/:gifId",
        element: <GifElements />,
        loader: gifLoader,
      },
      {
        path: "gifs/:gifId/edit",
        element: <EditGif />,
        loader: gifLoader,
        action: editAction,
      },
      {
        path: "gifs/:gifId/destroy",
        element: <ConfirmDelete />,
        loader: gifLoader,
        action: destroyAction,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
