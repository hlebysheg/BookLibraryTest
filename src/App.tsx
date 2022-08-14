import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyRoutes } from './common/routes';
import { Books } from './Component/books/book';
import { Header } from './Component/header';
import { Login } from './Component/login/Login';
import { Register } from './Component/register/Register';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header/>
          <Routes>
              <Route path={MyRoutes.login.path} element={<Login/>}/>
              <Route path={MyRoutes.register.path} element={<Register/>}/>
              <Route path={MyRoutes.book.path} element={<Books/>}/>
              <Route path={'/'} element={<Books/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
