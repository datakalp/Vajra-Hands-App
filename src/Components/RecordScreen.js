import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Video from './Resources/animation.mp4';
import './RecordScreen.css';
import {BsRecordCircleFill, BsFillPauseCircleFill, BsFillPlayCircleFill} from 'react-icons/bs'
import {IoArrowRedoCircleSharp} from 'react-icons/io5'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import ComplianceScreen from './ComplianceScreen';

const RecordScreen = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(true);//for camera permissions
  const [counter, setCounter] = useState(0);//for countdown
  const [recording, setRecording] = useState(false);//for starting recording after count down is finished
  const [showCounter, setShowCounter] = useState(false);
  const [redo, setRedo] = useState(false);
  const [handsVisible, setHandsVisible] = useState(false);
  const intervalRef = useRef(null);


  const animatedVideoRef = useRef(null);
  const videoRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  const { status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl } = useReactMediaRecorder({ video: true , askPermissionOnMount : true});

  // useEffect (() => {
  //   // Lock the screen orientation to landscape when the component mounts
  //   if (window.screen.orientation) {
  //     window.screen.orientation.lock("landscape")
  //       .then(() => {
  //         console.log("Screen orientation locked to landscape");
  //       })
  //       .catch((error) => {
  //         console.error("Failed to lock screen orientation: ", error);
  //       });
  //   }
  // },[]);


 



  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0 && recording) {
      setShowCounter(false);
      animatedVideoRef.current.play();
      startRecording();
      setRecording(false);
    }
  }, [counter, recording]);

  useEffect(() => {
    if (status === 'recording') {
      clearInterval(intervalRef.current);
      animatedVideoRef.current.onended = () => {
        stopRecording();
      };
    } else {
      intervalRef.current = setInterval(() => {
        console.log("interval running")
        detectHands(previewStream);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [status, previewStream]);

  

  const detectHands = async (previewStream) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = previewStream;
    const model = await handpose.load();
    model.estimateHands(videoRef.current).then((hands) => {
      if (hands.length > 0) {
        setHandsVisible(true);
        if (!showCounter) {
          setShowCounter(true);
          setCounter(3);
          setRecording(true);
          setRedo(false);
        }
      } else {
        setHandsVisible(false);
      }
    });
  };
  

  const VideoPreview = ({ stream }) => {
    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);
    if (!stream) {
      return null;
    }
    return (
    <video ref={videoRef} style={{width: "50%"}} autoPlay />
);
  };

//   const Start = () => {
//     useEffect(() => {
//       if (handsVisible) {
//         setShowCounter(true);
//         setCounter(3);
//         setRecording(true);
//         setRedo(false);
//       } 
//     }, [handsVisible]);
  
//     return (
//       <div>
//         {showCounter ? <div className='counter'>{counter}</div> : null}
//       </div>
//     );
//   };
  

  async function handleAnalysing() {

    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();
    const formData = new FormData();

    const current = new Date();
    
    const videoName = 'video'+Date.parse(current)+'.mp4';
    formData.append('file', blob, videoName);

    formData.append('user_id', userId);
    formData.append('device_id', userId+"'s Device");
    formData.append('timestamp', current);
    formData.append('app_version', "Employees.Aplha.1");

    const uploadResponse = await fetch('https://ee43-40-85-185-144.ngrok.io//upload_video', {
      method: 'POST',
      body: formData,
      credentials: 'include'

    });

    const data = await uploadResponse.json();
    console.log(data);

    if(uploadResponse.ok)
    {
    // {const result = await   fetch("https://216d-40-85-185-144.ngrok.io/get_feedback");

    //   const data = await result.json();

      const results = data.results;
      

      navigate("/ComplianceScreen", {state:{mediaBlobUrl, results}})
    }
    else
      alert("Could not process your request due to some error");

   
  }
  

  return (
      <div className='MediaRecorder'>
          <Header/>
             <div className="videos" style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height: '70vh', marginTop:'1vh'}}>
             <div className='square-box' style={{border : handsVisible ? "5px solid green" : "5px solid red"}}>
             </div>
             { status === 'stopped' ? (
              <video src={mediaBlobUrl} style={{width:"50%"}} controls autoPlay muted/> ) :
              (<VideoPreview stream={previewStream}/>)
             } 
              <video ref={animatedVideoRef} src={Video} style={{width:"50%"}} muted/>
            </div>
            
            <p style={{ position: 'absolute', top: "15%", right: "85%", fontWeight: "bold", color: 'black' }}>{status}</p>
            <div className='buttons' style={{ position: 'absolute', top: "48%", right: "73%" }}>
              {status === 'recording' ? (
                <div>
                  <button type='button' onClick={() => {
                    animatedVideoRef.current.pause();
                    pauseRecording();
                  }}
                  >
                    <BsFillPauseCircleFill />
                  </button>
             
                </div>
              ) : status === 'paused' ? (
                <div>
                  <button type='button' onClick={() => {
                    animatedVideoRef.current.play();
                    resumeRecording();
                  }}
                  >
                    <BsFillPlayCircleFill />
                  </button>
                </div>
              ) : status === 'stopped' ? (
                <div>
                 
                  <button type='submit' onClick={() => {
                    window.location.reload(false);
                  }}
                  >
                    <IoArrowRedoCircleSharp style={{color : "red"}}/>
                  </button>
                  
                </div>
              ) : (
                <div>
        {showCounter ? <div className='counter'>{counter}</div> : null}
      </div>
              )}
            </div>
        
        <button disabled = {status==='stopped' ? false : true} onClick={handleAnalysing} className='startAnalysingButton' style={{fontSize:"large", marginTop:"3vh", fontWeight:'bold'}}>Start Analysing</button>
      </div>
  );
};

export default RecordScreen;
