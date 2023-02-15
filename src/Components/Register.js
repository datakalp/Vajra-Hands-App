import React from 'react';
import Logo from './Resources/logo.png';
import "./Register.css"


const Register = () => {


    
    return (
        <div className="Register">

        <div className="form">

            <img src={Logo} />
            <input type="text" placeholder="Username" />
            <button type="submit" background>REGISTER</button>
          </div>
      </div>
    );
}


export default Register;