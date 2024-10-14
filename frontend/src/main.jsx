import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import Login from './components/Login.jsx';
import LeaderBoard from './components/LeaderBoard.jsx';
import MyScore from './components/MyScore.jsx';
import Register from './components/Register.jsx';
import StartTest from './components/StartTest.jsx';
import AdminLogin from './admin-page/AdminLogin.jsx';
import AddQuestion from './admin-page/AddQuestion.jsx';
import { store } from './store/store.jsx';
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/start-test", element: <StartTest /> },
      { path: "/my-score", element: <MyScore /> },
      { path: "/leader-board", element: <LeaderBoard /> },
      { path: "/admin-login", element: <AdminLogin /> },
      { path: "/add-question", element: <AddQuestion /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
