
import {React,useState} from 'react';
import RecordScreen from './RecordScreen';

const HomeScreen=()=>{
  const [openCam,setOpen]=useState(false);

return(<div>
  {openCam==false &&
  <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
  marginRight:"30%",padding:"5%"}}>
    <button style={{ fontSize:"30px",borderRadius:"5em"}} onClick={()=>setOpen(true)}>+</button>
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
