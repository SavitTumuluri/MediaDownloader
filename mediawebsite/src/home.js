import React, {useState} from 'react';
import './App.css';
import CustomSelect from './CustomSelect';
import axios from 'axios';

function Home() {
  const [url, setUrl] = useState('');
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const websiteHostnames = {
    Youtube: ['www.youtube.com', 'youtube.com', 'youtu.be'],
    instagram: ['www.instagram.com', 'instagram.com']
  };
  
  const handleSelectChange = (selectedOption) => {
    console.log('Selected option:', selectedOption);
    setOption(selectedOption);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  function confirmURL(domainType, url) {
    console.log(domainType, url, websiteHostnames[domainType])
    try {
      const parsedURL = new URL(url);
      return websiteHostnames[domainType].includes(parsedURL.hostname);
    } catch {
      return false;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    console.log(option);
    if (!url || !option) {
      setMessage('Please select an option and provide a URL.');
      return;
    } else if (confirmURL(option.value, url)) {
      setMessage(`URL: ${url}`);
    } else {
      setMessage(`Not a {option.value} URL`);
      return;
    }
    setLoading(true);
    setMessage('');

  try {
    const response = await axios.post('http://localhost:5000/download', { url }, { responseType: 'blob' });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'video.mp3');
    document.body.appendChild(link);
    link.click();
    setMessage('Download started!');
  } catch (error) {
    console.error('Error downloading the video:', error);
    setMessage('Failed to download. Please try again.');
  }

  setLoading(false);
};

  return (
    <div className="App">
      <header className="App-header">
        
          <h1>Welcome to MediaConverter Home</h1>
          <label htmlFor="options"></label>
          {/*<select id="options" className='link_submit'>
            <option value="" disabled selected>Select</option>
            <option value="Youtube">Youtube</option>
          </select>*/}
          <div className='input-container'>
            <CustomSelect onChange={handleSelectChange} />
            <input id="url" 
              type="text" 
              className='link_input' 
              value={url} 
              onChange={handleInputChange}
              placeholder="Enter URL"></input>
            <input type="submit" 
              value={loading ? 'Converting...' : 'Convert'}
              className='link_submit'
              onClick={handleFormSubmit}
              disabled={loading}></input>
          </div>
        {message && <p>{message}</p>}
      </header>
    </div>
  )
}

export default Home;
