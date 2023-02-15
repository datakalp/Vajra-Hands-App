import React from 'react';
import Logo from './Resources/logo.png';

const Header = () => {
   
    return (

            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height:'10vh'}}>
                <img src={Logo} style={{width:"10%", height:"100%"}}/>
                <p style={{color:"darkgray", fontSize:"large", fontWeight:"bold"}}>Vajra Hands</p>
                <p style={{color:"darkgray", fontSize:"large", fontWeight:"bold"}}>Duration</p>
            </div>
        );
    
}

export default Header;