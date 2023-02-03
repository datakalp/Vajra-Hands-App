
import {React,useState} from 'react';
import RecordScreen from './RecordScreen';
import {AiOutlineVideoCameraAdd} from 'react-icons/ai';

const HomeScreen=()=>{
  const [openCam,setOpen]=useState(false);
  

return(<div>
  {openCam==false &&
  <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
  marginRight:"30%",padding:"10%"}}>
    <button onClick={()=>setOpen(true)}><AiOutlineVideoCameraAdd/></button>
    </div>
  }

    {
      openCam && 
      <RecordScreen/> 
    }
    </div>
 
)

}

export default HomeScreen;
