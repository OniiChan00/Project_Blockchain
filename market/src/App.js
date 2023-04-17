
import './App.css';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';
import Profile from './components/Profile';
import Nav_Bar from './components/Nav_Bar';



class App extends Component {
  render(){
    return (
      <div>
      <Nav_Bar/>
      <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/inventory" element={<Inventory/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Routes>
      
      </div>
    );
  }
}

export default App;
