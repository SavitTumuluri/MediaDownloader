import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-popup">
          <h1>Welcome to MediaConverter Home</h1>
          {/* <button className='button_ui'>
            Enter
          </button> */}
          <label for="options"></label>
          <select id="options" className='link_submit'>
            <option value="" disabled selected>Select</option>
            <option value="Youtube">Youtube</option>
          </select>
          <input id="url" type="text" className='link_input'></input>
          <input type="submit" value="Convert" className='link_submit'></input>
        </div>
      </header>
    </div>
  )
}

export default Home;
