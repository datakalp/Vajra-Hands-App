import React, { useState, useEffect } from 'react';
import Header from './Header';
import Video from './Resources/animation.mp4';
import step0done from './Resources/Feedback/Done_step_0_initial_rinse.png';
import step1done from './Resources/Feedback/Done_step_1_take_soap.png';
import step2done from './Resources/Feedback/Done_step_2_palm_to_palm.png';
import step3done from './Resources/Feedback/Done_step_3_dorsum.png';
import step4done from './Resources/Feedback/Done_step_4_fingers_interlaced.png';
import step5done from './Resources/Feedback/Done_step_5_fingers_interlocked.png';
import step6done from './Resources/Feedback/Done_step_6_thumb.png';
import step7done from './Resources/Feedback/Done_step_7_palm_to_clap.png';
import step8done from './Resources/Feedback/Done_step_8_final_rinse.png';

import step0wrong from './Resources/Feedback/Missed_step_0_initial_rinse.png';
import step1wrong from './Resources/Feedback/Missed_step_1_take_soap.png';
import step2wrong from './Resources/Feedback/Missed_step_2_palm_to_palm.png';
import step3wrong from './Resources/Feedback/Missed_step_3_dorsum.png';
import step4wrong from './Resources/Feedback/Missed_step_4_fingers_interlaced.png';
import step5wrong from './Resources/Feedback/Missed_step_5_fingers_interlocked.png';
import step6wrong from './Resources/Feedback/Missed_step_6_thumb.png';
import step7wrong from './Resources/Feedback/Missed_step_7_palm_to_clap.png';
import step8wrong from './Resources/Feedback/Missed_step_8_final_rinse.png';

import step0ongoing from './Resources/Feedback/Ongoing_step_0_initial_rinse.png';
import step1ongoing from './Resources/Feedback/Ongoing_step_1_take_soap.png';
import step2ongoing from './Resources/Feedback/Ongoing_step_2_palm_to_palm.png';
import step3ongoing from './Resources/Feedback/Ongoing_step_3_dorsum.png';
import step4ongoing from './Resources/Feedback/Ongoing_step_4_fingers_interlaced.png';
import step5ongoing from './Resources/Feedback/Ongoing_step_5_fingers_interlocked.png';
import step6ongoing from './Resources/Feedback/Ongoing_step_6_thumb.png';
import step7ongoing from './Resources/Feedback/Ongoing_step_7_palm_to_clap.png';
import step8ongoing from './Resources/Feedback/Ongoing_step_8_final_rinse.png';

import step0notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step1notVisible from './Resources/Feedback/Question_step_1_take_soap.png';
import step2notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step3notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step4notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step5notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step6notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step7notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';
import step8notVisible from './Resources/Feedback/Question_step_0_initial_rinse.png';

import { useLocation } from 'react-router-dom';
import "./ComplianceScreen.css";

const ComplianceScreen = () => {
  const location = useLocation();

  const results = location.state.results;

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

  const stepCorrectImages = [
    step0done,
    step1done,
    step2done,
    step3done,
    step4done,
    step5done,
    step6done,
    step7done,
    step8done,
  ];
  
  const stepIncorrectImages = [
    step0wrong,
    step1wrong,
    step2wrong,
    step3wrong,
    step4wrong,
    step5wrong,
    step6wrong,
    step7wrong,
    step8wrong,
  ];

  const stepOngoingImages = [
    step0ongoing,
    step1ongoing,
    step2ongoing,
    step3ongoing,
    step4ongoing,
    step5ongoing,
    step6ongoing,
    step7ongoing,
    step8ongoing
  ]

  const stepNotVisibleImages = [
    step0notVisible,
    step1notVisible,
    step2notVisible,
    step3notVisible,
    step4notVisible,
    step5notVisible,
    step6notVisible,
    step7notVisible,
    step8notVisible
  ]

  function VideoStepFeedback({ video }) {
    const [steps, setSteps] = useState(new Map([
      [0, { feedback: null }],
      [1, { feedback: null }],
      [2, { feedback: null }],
      [3, { feedback: null }],
      [4, { feedback: null }],
      [5, { feedback: null }],
      [6, { feedback: null }],
      [7, { feedback: null }],
      [8, { feedback: null }],
    ]));
  
    useEffect(() => {
      const videoElement = document.getElementById('animation');
      if (videoElement) {
        const intervalId = setInterval(() => {
          const currentTime = videoElement.currentTime;
          if (currentTime < 3.5) {
            updateStep(0);
          } else if (currentTime < 7) {
            updateStep(1);
          } else if (currentTime < 10.5) {
            updateStep(2);
          } else if (currentTime < 14) {
            updateStep(3);
          } else if (currentTime < 17.5) {
            updateStep(4);
          } else if (currentTime < 21) {
            updateStep(5);
          } else if (currentTime < 24.5) {
            updateStep(6);
          } else if (currentTime < 28) {
            updateStep(7);
          } else {
            updateStep(8);
          }
        }, 3500);
  
        return () => clearInterval(intervalId);
      }
    }, []);
  
    function updateStep(step) {
      const results = location.state.results;
      const feedback = results[step].value;
      setSteps(prevSteps => {
        const stepInfo = prevSteps.get(step);
        return new Map(prevSteps).set(step, { ...stepInfo, feedback });
      });
    }
  
    return (
        <div className='results' style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height:'15vh', marginTop:'2vh'}}>
        {[...steps].map(([step, { feedback }]) => (
         <img key={step} src={feedback === 'Step Followed Correctly' ? stepCorrectImages[step] : feedback === 'Step Not followed Correctly' ? stepIncorrectImages[step] : feedback === 'Hand not visible' ? stepNotVisibleImages[step] : stepOngoingImages[step]} />
        ))}
      </div>
    );
  }
  

  return (
    <div style={{ width: "100%", overflow: 'hidden' }}>
      <Header />
      <div className="videos" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height: '70vh', marginTop: '1vh' }}>
        <video src={location.state.mediaBlobUrl} style={{ width: "50%" }} muted autoPlay controls  />
        <video id='animation' src={Video} style={{ width: "50%" }} autoPlay controls  />
      </div>
      {/* show results here */}
      <VideoStepFeedback video={location.state.mediaBlobUrl} />
    </div>
  );
}

export default ComplianceScreen;
