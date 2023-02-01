import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Video from './animation.mp4';
import './RecordScreen.css';
import {BsRecordCircleFill, BsFillPauseCircleFill, BsFillStopCircleFill , BsFillPlayCircleFill} from 'react-icons/bs'
import {IoArrowRedoCircleSharp} from 'react-icons/io5'

const RecordScreen = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);//for camera permissions
  const [counter, setCounter] = useState(0);//for countdown
  const [recording, setRecording] = useState(false);//for starting recording after count down is finished

  const { status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0 && recording) {
      animatedVideoRef.current.play();
      startRecording();
      setRecording(false);
    }
  }, [counter, recording]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const animatedVideoRef = useRef(null);

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
    return <video ref={videoRef} style={{width: "50%"}} autoPlay controls />;
  };

  return (
    <div className='RecordScreen'>
      {permissionsGranted ? (
        
            <div className='MediaRecorder'>
            <p>{status}</p>
            {counter===0 ? (

            <div className='buttons'>
              {status === 'recording' ? (
                <div>
                  <button onClick={() => {
                    animatedVideoRef.current.pause();
                    pauseRecording();
                  }}
                  >
                    <BsFillPauseCircleFill style={{color : "red"}}/>
                  </button>
                  <button onClick={() => {
                    animatedVideoRef.current.pause();
                    stopRecording();
                  }}
                  >
                    <BsFillStopCircleFill style={{color : "red"}}/>
                  </button>
                </div>
              ) : status === 'paused' ? (
                <div>
                  <button onClick={() => {
                    animatedVideoRef.current.play();
                    resumeRecording();
                  }}
                  >
                    <BsFillPlayCircleFill style={{color : "red"}}/>
                  </button>
                  <button onClick={() => {
                    animatedVideoRef.current.pause();
                    stopRecording();
                  }}
                  >
                    <BsFillStopCircleFill style={{color : "red"}}/>
                  </button>
                </div>
              ) : status === 'stopped' ? (
                <div>
                  <button onClick={() => {
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
                  <button onClick={() => {
                    setCounter(3);
                    setRecording(true);
                  }}
                  >
                    <BsRecordCircleFill style={{color : "red"}}/>
                    {/* Start Recording */}
                  </button>
                </div>
              )}
            </div>
                ) : (
                  <div>{counter}</div>
             )}
          
              <div className="videos" style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
               { status === 'stopped' ? (
                <video src={mediaBlobUrl} style={{width:"50%"}} controls/> ) :
                (<VideoPreview stream={previewStream} controls />)
               } 
                <video ref={animatedVideoRef} src={Video} style={{width:"50%"}} controls />
              </div>
            </div>
        
      ) : (
        <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
        marginRight:"30%",padding:"10%"}}>
          <button style={{ fontSize:"30px",borderRadius:"5em"}} onClick={handleStartRecording}>Turn on my Camera</button>
          </div>
      )}
    </div>
  );
};

export default RecordScreen;
