import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './page/Home';
import PageNotFound from './page/PageNotFound';
import Meeting from './page/Meeting';
import Settings from './page/Settings';
import Login from './page/Login';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
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
