
import {React,useState} from 'react';
import {Button} from '@material-ui/core';
import {Add} from '@mui/icons-material';
import RecordScreen from './RecordScreen';

const HomeScreen=()=>{
  const [openCam,setOpen]=useState(false);

return(<div>
  {openCam==false &&
  <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
  marginRight:"30%",padding:"5%"}}>
    <Button style={{ fontSize:"25px",borderRadius:"5em"}} onClick={()=>setOpen(true)}><Add/></Button>
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
