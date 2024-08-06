import React from 'react';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import AppLayout from './AppLayout';
import Combat from '../components/Combat';
import Home from '../components/Home';
import CreateCharacter from '../components/CreateCharacter';
import Adventure from '../components/Adventure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element= {<Home/>}/>
          <Route path='createCharacter' element ={<CreateCharacter />}/>
          <Route path='adventure' element={<Adventure />}/>
          <Route path='combat' element={<Combat/>}/>        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
