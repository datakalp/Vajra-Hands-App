import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Video from './animation.mp4';
import './RecordScreen.css';

const RecordScreen = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
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
    return <video ref={videoRef} width={500} height={500} autoPlay controls />;
  };

  const { status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  return (
    <div>
      {permissionsGranted ? (
        <ReactMediaRecorder
          video
          render={({
            status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl
          }) => (
            <div>
              <p>{status}</p>
              <button onClick={() => {
                animatedVideoRef.current.play();
                startRecording();
              }}
              >
                Start Recording
              </button>
              <button onClick={() => {
                animatedVideoRef.current.pause();
                pauseRecording();
              }}
              >
                Pause Recording
              </button>
              <button onClick={() => {
                animatedVideoRef.current.play();
                resumeRecording();
              }}
              >
                Resume Recording
              </button>
              <button onClick={() => {
                animatedVideoRef.current.pause();
                stopRecording();
              }}
              >
                Stop Recording
              </button>
              <div className="videos">
                <VideoPreview stream={previewStream} controls />
                <video ref={animatedVideoRef} src={Video} controls />
              </div>
            </div>
          )}
        />
      ) : (
        <button onClick={handleStartRecording}>Grant Permissions</button>
      )}
    </div>
  );
};

export default RecordScreen;
