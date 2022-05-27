import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './page/Home';
import PageNotFound from './page/PageNotFound';
import Meeting from './page/Meeting';
import Settings from './page/Settings';
import Login from './page/Login';



function App() {

  const joinSession = (link) => {  }

  const addSession = () => {
    console.log('Do nothing');
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home addSession={addSession} joinSession={joinSession} />} />
          <Route path='settings' element={<Settings />} />
          <Route path='login' element={<Login />} />
          {/* <Route path='/:link' element={<Meeting />} /> */}
          <Route path='/error' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
