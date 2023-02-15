import React from 'react';
import Logo from './Resources/logo.png';
import "./Register.css"


const Register = () => {
    return (
        <div className="Register">

        <div className="form">

            <img className='logo' src={Logo} />
            <input type="text" placeholder="Username" />
            <button className='RegisterButton' type="submit" style={{backgroundColor:'#0066cc'}}>REGISTER</button>
          </div>
      </div>
    );
}


export default Register;