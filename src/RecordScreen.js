import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Video from './animation.mp4';
import './RecordScreen.css';
import {BsRecordCircleFill, BsFillPauseCircleFill, BsFillStopCircleFill , BsFillPlayCircleFill} from 'react-icons/bs'
import {IoArrowRedoCircleSharp} from 'react-icons/io5'

const RecordScreen = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(true);//for camera permissions
  const [counter, setCounter] = useState(0);//for countdown
  const [recording, setRecording] = useState(false);//for starting recording after count down is finished
  const [showCounter, setShowCounter] = useState(false);

  const animatedVideoRef = useRef(null);

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


  const VideoPreview = ({ stream }) => {
    const videoRef = useRef(null);

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

  return (
    <div className='RecordScreen'>
      {permissionsGranted ? (
        
            <div className='MediaRecorder'>
            <div style={{ display: 'flex', position: 'relative' }}>
              
             <div className="videos" style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
             { status === 'stopped' ? (
              <video src={mediaBlobUrl} style={{width:"50%"}} controls/> ) :
              (<VideoPreview stream={previewStream}/>)
             } 
              <video ref={animatedVideoRef} src={Video} style={{width:"50%"}} controls />
            </div>
            <div className='square-box'>
            </div>
            <p style={{ position: 'absolute', top: 0, right: "93%", fontWeight: "bold", color: 'whitesmoke' }}>{status}</p>
            <div className='buttons' style={{ position: 'absolute', top: "50%", right: "73%" }}>
              {status === 'recording' ? (
                <div>
                  <button type='button' onClick={() => {
                    animatedVideoRef.current.pause();
                    pauseRecording();
                  }}
                  >
                    <BsFillPauseCircleFill />
                  </button>
                  <button type='button' onClick={() => {
                    animatedVideoRef.current.pause();
                    stopRecording();
                  }}
                  >
                    <BsFillStopCircleFill style={{color : "red"}}/>
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
                  <button type='button' onClick={() => {
                    animatedVideoRef.current.pause();
                    stopRecording();
                  }}
                  >
                    <BsFillStopCircleFill style={{color : "red"}}/>
                  </button>
                </div>
              ) : status === 'stopped' ? (
                <div>
                  <button type='submit' onClick={() => {
                    animatedVideoRef.current.currentTime = 0;
                    setCounter(3);
                    setRecording(true);
                  }}
                  >
                    <IoArrowRedoCircleSharp style={{color : "red"}}/>
                  </button>
                </div>
              ) : (
                <div>
                  {
                    showCounter ? (<div className='counter'>{counter}</div>) : 
                    (
                  <button type='button' onClick={() => {
                    setShowCounter(true);
                    setCounter(3);
                    setRecording(true);
                  }}
                  >
                    <BsRecordCircleFill style={{color : "red"}}/>
                  </button> )
                  }
                </div>
              )}
            </div>
            </div>
            </div>
        
      ) : (
        <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
        marginRight:"30%",padding:"10%"}}>
          </div>
      )}
    </div>
  );
};

export default RecordScreen;
