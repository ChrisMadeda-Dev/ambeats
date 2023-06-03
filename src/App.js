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
import ThirdSec from "./components/ThirdSec";
import ThirdSec2 from "./components/ThirdSec2";
import BottomNav from "./components/BottomNav";
import Profile from "./components/Profile";
import MusicPlayer from "./components/MusicPlayer";
import ListenPage from "./components/ListenPage";
import ListenRoom from "./components/ListenRoom";
import PLayListPage from "./components/PLayListPage";
import PlayListRoom from "./components/PlayListRoom";

function App() {
  const userPhone = parseFloat(localStorage.getItem("user-phone"));
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={userPhone ? <Home /> : <SignIn />} />
        <Route path="/thirdsec" element={<ThirdSec />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listenpage" element={<ListenPage />} />
        <Route path="/listenroom" element={<ListenRoom />} />
        <Route path="/playlist" element={<PLayListPage />} />
        <Route path="/playlistroom" element={<PlayListRoom />} />
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
      <div>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default App;

//https://github.com/ChrisMadeda-Dev/ambeats.git
