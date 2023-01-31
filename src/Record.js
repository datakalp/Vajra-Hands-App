import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PauseIcon from '@material-ui/icons/Pause';

function Record() {
  const videoRef = useRef(null);
  const [recording, setRecording] = React.useState(false);
  const [recordedBlobs, setRecordedBlobs] = React.useState([]);
  const [stream, setStream] = React.useState(null);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [currentVideo, setCurrentVideo] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setStream(stream);
      });
  }, []);

  const startRecording = () => {
    setRecording(true);
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const mediaRecorder = new MediaRecorder(stream, options);
    const chunks = [];

    mediaRecorder.addEventListener('dataavailable', event => {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const recordedBlob = new Blob(chunks, { type: 'video/webm' });
      setRecordedBlobs(prevRecordedBlobs => [...prevRecordedBlobs, recordedBlob]);
    });

    setMediaRecorder(mediaRecorder);
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorder.stop();
  };

  const downloadVideo = (blob, index) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recorded-video-${index}.webm`;
    document.body.appendChild(link);
    link.click();
  };

  const playVideo = (blob) => {
    setCurrentVideo(URL.createObjectURL(blob));
    setPlaying(true);
  };

  const pauseVideo = () => {
    setPlaying(false);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: '50%', height: '50%' }} autoPlay>
          
      </video>
      {playing && <video src={currentVideo} controls onPause={pauseVideo} autoPlay/>}
      {recording ?
            <IconButton onClick={stopRecording}>
                <StopIcon />
            </IconButton>
            : <IconButton onClick={startRecording}>
                <PlayArrowIcon />
            </IconButton>
          }
      <div>
      {recordedBlobs.map((recordedBlob, index) => (
    <div key={index}>
      <IconButton onClick={() => playVideo(recordedBlob)}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={() => downloadVideo(recordedBlob, index)}>
        <DownloadIcon />
      </IconButton>
    </div>
  ))}
  {currentVideo && (
    <div>
      <video src={currentVideo} controls={true} autoPlay={playing} onPause={pauseVideo}/>
      {playing ? (
        <IconButton onClick={pauseVideo}>
          <PauseIcon />
        </IconButton>
      ) : (
        <IconButton onClick={()=>setPlaying(true)}>
          <PlayArrowIcon />
        </IconButton>
      )}
    </div>
  )}
</div>
</div>
 );
}

export default Record;






