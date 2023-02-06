import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomeScreen from './Components/HomeScreen';
import RecordScreen from './Components/RecordScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/HomeScreen" element={<HomeScreen/>}/>
        <Route path="/RecordScreen" element={<RecordScreen/>}/>
    </Routes>
</BrowserRouter>

);

