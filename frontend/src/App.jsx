import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import House from './pages/House';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className="pages container">
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/house/:id'
              element={<House />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;