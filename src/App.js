import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";



function App() {
  const userPhone = parseFloat(localStorage.getItem("user-phone"));
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={userPhone ? <Home /> : <SignIn />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;

//https://github.com/ChrisMadeda-Dev/ambeats.git