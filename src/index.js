import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomeScreen from './Components/HomeScreen';
import RecordScreen from './Components/RecordScreen';
import ComplianceScreen from './Components/ComplianceScreen';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/HomeScreen" element={<HomeScreen/>}/>
        <Route path="/RecordScreen" element={<RecordScreen/>}/>
        <Route path="/ComplianceScreen" element={<ComplianceScreen/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
    </Routes>
</BrowserRouter>

);

