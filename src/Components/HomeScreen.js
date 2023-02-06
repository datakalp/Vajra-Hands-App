
import {React} from 'react';
import {AiOutlineVideoCameraAdd} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HomeScreen=()=>{

  const navigate = useNavigate();
  

return(

  <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
  marginRight:"30%",padding:"10%"}}>
    <button onClick={()=>navigate("/RecordScreen")}><AiOutlineVideoCameraAdd/></button>
    </div>
 
 
)

}

export default HomeScreen;
