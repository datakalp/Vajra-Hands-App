import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Video from './Resources/animation.mp4';
import './RecordScreen.css';
import {BsRecordCircleFill, BsFillPauseCircleFill, BsFillPlayCircleFill} from 'react-icons/bs'
import {IoArrowRedoCircleSharp} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
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



  const animatedVideoRef = useRef(null);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  const { status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl } = useReactMediaRecorder({ video: true , askPermissionOnMount : true});

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
      animatedVideoRef.current.onended = () => {
        stopRecording();
      };
    }
  }, [status]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      detectHands(previewStream);
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [previewStream]);
  

  const detectHands = async (previewStream) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = previewStream;
    const model = await handpose.load();
    model.estimateHands(videoRef.current).then((hands) => {
      if (hands.length > 0) {
        setHandsVisible(true);
      } else {
        setHandsVisible(false);
      }
    });
  };
  
  useEffect(() => {
    detectHands(previewStream);
  }, [previewStream]);
  

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

  const Start = () => {
    return (<div>
      {
        showCounter ? (<div className='counter'>{counter}</div>) : 
        (
          <button type='button' onClick={() => {
            if (handsVisible) {
              setShowCounter(true);
              setCounter(3);
              setRecording(true);
              setRedo(false);
            } else {
              alert("Please make sure your hands are visible in the video preview before starting the recording.");
            }
          }}
          >
        <BsRecordCircleFill style={{color : "red"}}/>
      </button> )
      }
    </div>);
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
              <video ref={animatedVideoRef} src={Video} style={{width:"50%"}}/>
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
                <div>{
                  redo ? (<Start/>) : (
                  <button type='submit' onClick={() => {
                    window.location.reload(false);
                  }}
                  >
                    <IoArrowRedoCircleSharp style={{color : "red"}}/>
                  </button>)
                  }
                </div>
              ) : (
                <Start/>
              )}
            </div>
        
        <button disabled = {status==='stopped' ? false : true} onClick={()=>navigate("/ComplianceScreen", {state:{mediaBlobUrl}})} className='startAnalysingButton' style={{fontSize:"large", marginTop:"3vh", fontWeight:'bold'}}>Start Analysing</button>
      </div>
  );
};

export default RecordScreen;
