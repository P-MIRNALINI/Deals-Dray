import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './Table';
import AddUser from './AddUser';
import UpdatedUser from './UpdatedUser';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';



function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Table />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:id" element={<UpdatedUser />} />
      </Routes>
    </Router>
  );
}

export default App;
