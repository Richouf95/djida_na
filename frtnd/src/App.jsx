import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import HouseDetail from './components/HouseDetail';
import Profile from './pages/Profile';
// import House from './pages/House'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from '../src/hooks/useAuthContext'

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className="pages container">
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/login'/>}
            />
            <Route
              path='/house/:id'
              element={user ? <HouseDetail /> : <Navigate to='/login'/>}
            />
            <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to='/login'/>}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/'/>}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;