import React from 'react';
import Logo from './Resources/logo.png';
import "./Login.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();

    function handleLogin() {
        navigate("/HomeScreen");
    }

    function handleRegister() {
        navigate("/Register");
    }

    return (
        <div className="Register">

        <div className="form">
            <img className='logo' src={Logo} />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className='RegisterButton' type="submit" onClick={handleLogin}>LOGIN</button>
            <div class="separator" style={{width:"80%"}}>Or</div>
            <button className='RegisterButton' type="submit" style={{ backgroundColor: '#95809a'}} onClick={handleRegister}>REGISTER</button>
          </div>
      </div>
    );
}


export default Login;