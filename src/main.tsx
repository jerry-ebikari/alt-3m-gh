import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.tsx';
import RepoListPage from './pages/RepoListPage.tsx';
import RepoPage from './pages/RepoPage.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/repo-list',
        element: <RepoListPage/>
      },
      {
        path: 'repo/:repoId',
        element: <RepoPage/>
      },
      {
        path: '',
        element: <RepoListPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
