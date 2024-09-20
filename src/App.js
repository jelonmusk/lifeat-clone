import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for the task input
  const [task, setTask] = useState('');
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the YouTube video URL
  const [videoURL, setVideoURL] = useState('');
  // State for the timer countdown (25 minutes)
  const [time, setTime] = useState(25 * 60);
  // State to manage timer activity
  const [isActive, setIsActive] = useState(false);
  // State for the current background room
  const [background, setBackground] = useState('room1');

  // Function to add a task to the list
  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]); // Add task to the tasks array
      setTask(''); // Clear the input field
    }
  };

  // Effect for managing the timer countdown
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrease time by 1 every second
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval); // Stop the timer when it reaches 0
      setIsActive(false); // Reset timer activity state
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isActive, time]);

  // Function to format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Return formatted time
  };

  return (
    <div className="App" style={{ backgroundImage: `url(/images/${background}.jpg)` }}>
      <header className="App-header">
        <h1>Virtual Study Room</h1>
        
        <div className="video-container">
          <iframe
            width="100%" // Make video responsive
            height="315"
            src={videoURL} // Embed YouTube video using the URL
            title="YouTube Video"
            allowFullScreen
          ></iframe>
          <input
            type="text"
            placeholder="Enter YouTube URL" // Placeholder for video URL input
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)} // Update videoURL on input change
          />
        </div>

         
        <div className="task-manager">
          <input
            type="text"
            placeholder="Add a task" // Placeholder for task input
            value={task}
            onChange={(e) => setTask(e.target.value)} // Update task on input change
          />
          <button onClick={addTask}>Add Task</button> {/* Button to add task */}
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li> // Display each task in the list
            ))}
          </ul>
        </div>


        <div className="timer">
          <h2>{formatTime(time)}</h2> {/* Display formatted time */}
          <button onClick={() => setIsActive(true)}>Start Timer</button> {/* Start timer button */}
        </div>


        <div className="room-selector">
          <button onClick={() => setBackground('room1')}>Room 1</button> {/* Button to select Room 1 */}
          <button onClick={() => setBackground('room2')}>Room 2</button> {/* Button to select Room 2 */}
          <button onClick={() => setBackground('room3')}>Room 3</button>
          <button onClick={() => setBackground('room4')}>Room 4</button>
        </div>

      </header>
    </div>
  );
}

export default App;
