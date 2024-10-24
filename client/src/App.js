
import SignUp from "./pages/sign_up/signup";
import Home from "./pages/home/home";
import Layout from "./components/layout/layout";
import Shop from "./pages/shop/shop";
import SignIn from "./pages/sign_in/signin";
import Cart from "./pages/cart/cart";
import Profile from "./pages/profile/profile";
import Blog from './pages/blog/blog'
import Product from "./pages/product/product";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./store/requireAuth";
import "./index.css";
const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/Shop", element: <Shop /> },

      {
        path: "/Profile",
        element: (
          // <RequireAuth>
         <Profile />
          // </RequireAuth>  
        ),
      },
      {
        path: "/Cart",
        element: (
          // <RequireAuth>
          <Cart />
          // </RequireAuth>
        ),
      },
      {
        path: "/Blog",
        element: (
        //  <RequireAuth>
            <Blog />
          // </RequireAuth>
        ),
      },

      {
        path: "/Product/:id",
        element: (
        // <RequireAuth>
            <Product />
        //  </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/Signin",
    element: <SignIn />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
