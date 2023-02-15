import React from 'react';
import Header from './Header';
import Video from './Resources/animation.mp4';
import step0done from './Resources/Feedback/Done_step_0_initial_rinse.png';
import { useLocation } from 'react-router-dom';
import "./ComplianceScreen.css";


const ComplianceScreen = () => {

    const location = useLocation();
    
    return (
        <div style={{width:"100%",   overflow:'hidden'}}>
            <Header/>
            <div className="videos" style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height:'10%'}}>
                <video src={location.state.mediaBlobUrl} style={{width:"50%"}} muted autoPlay controls/>
                <video src={Video} style={{width:"50%"}} autoPlay controls/>
            </div>
            <div className='results' style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
                <img src={step0done}/>
            </div>
        </div>
    );
}


export default ComplianceScreen;