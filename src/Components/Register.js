import React from 'react';
import Logo from './Resources/logo.png';
import "./Register.css"
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    function handleRegister() {

        navigate("/Login");
    }

    return (
        <div className="Register">

        <div className="form">
            <img className='logo' src={Logo} />
            <input type="text" placeholder="Email" />
            <button className='RegisterButton' type="submit" onClick={handleRegister}>REGISTER</button>
          </div>
      </div>
    );
}


export default Register;