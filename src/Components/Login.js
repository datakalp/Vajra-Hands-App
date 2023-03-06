import React, {useState} from 'react';
import Logo from './Resources/logo.png';
import "./Login.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [userId, setUserId] = useState();

    const navigate = useNavigate();

  

    async function handleLogin() {

         navigate("/HomeScreen", {state:{userId}});
    }

    function handleRegister() {
        navigate("/Register");
    }

    return (
        <div className="Register">

        <div className="form">
            <img className='logo' src={Logo} />
            <input type="text" placeholder="Username" onChange={(e)=> setUserId(e.target.value)}/>
            <input type="password" placeholder="Password" />
            <button className='RegisterButton' type="submit" onClick={handleLogin}>LOGIN</button>
            <div className="separator" style={{width:"80%"}}>Or</div>
            <button className='RegisterButton' type="submit" style={{ backgroundColor: '#95809a'}} onClick={handleRegister}>REGISTER</button>
          </div>
      </div>
    );
}


export default Login;