import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from '../src/pages/Todo';
import {Routes,Route, useParams} from 'react-router-dom'
import DetailPage from './pages/detailPage/DetailPage';

function App() {

  return (
    <Routes>
      <Route path='/' element = {<Todo/>} />
      <Route path="/detail/:id" element={<DetailPage />}/>
    </Routes>
  );
}

export default App;