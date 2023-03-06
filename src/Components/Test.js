import React, { useState } from 'react';

function Test() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [appVersion, setAppVersion] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    formData.append('device_id', deviceId);
    formData.append('timestamp', timestamp);
    formData.append('app_version', appVersion);

    const response = await fetch('http://20.22.198.215:5000/upload_video', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select video file:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="user-id">User ID:</label>
          <input type="text" id="user-id" value={userId} onChange={(event) => setUserId(event.target.value)} />
        </div>
        <div>
          <label htmlFor="device-id">Device ID:</label>
          <input type="text" id="device-id" value={deviceId} onChange={(event) => setDeviceId(event.target.value)} />
        </div>
        <div>
          <label htmlFor="timestamp">Timestamp:</label>
          <input type="text" id="timestamp" value={timestamp} onChange={(event) => setTimestamp(event.target.value)} />
        </div>
        <div>
          <label htmlFor="app-version">App Version:</label>
          <input type="text" id="app-version" value={appVersion} onChange={(event) => setAppVersion(event.target.value)} />
        </div>
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
}

export default Test;