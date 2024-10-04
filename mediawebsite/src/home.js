import React from 'react';
import './App.css';
import CustomSelect from './CustomSelect';

function Home() {
  const handleSelectChange = (option) => {
    console.log('Selected option:', option);
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
          <CustomSelect onChange={handleSelectChange} />
          <input id="url" type="text" className='link_input'></input>
          <input type="submit" value="Convert" className='link_submit'></input>
        
      </header>
    </div>
  )
}

export default Home;
