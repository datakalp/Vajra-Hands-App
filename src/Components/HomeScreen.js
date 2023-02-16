
import {React} from 'react';
import {AiOutlineVideoCameraAdd} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HomeScreen=()=>{

  const navigate = useNavigate();
  

return(

  <div style={{textAlign:"center", marginTop:"20%",border:"1px solid grey", marginLeft:"15%",
  marginRight:"15%",padding:"20%"}}>
    <button onClick={()=>navigate("/RecordScreen")} style={{fontSize: "6em"}}><AiOutlineVideoCameraAdd/></button>
    </div>
 
 
)

}

export default HomeScreen;
