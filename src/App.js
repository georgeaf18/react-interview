import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid';

import ActivityHistory from "./components/activityHistory";

function App() {
  const initialActivities = () => JSON.parse(window.sessionStorage.getItem("activities")) || []
  const [activities, setActivities] = useState(initialActivities);
  const activityDescriptionRef = useRef();
  const storedActiveActivity = () => JSON.parse(window.sessionStorage.getItem("activeActivity")) || null;
  const [activeActivity, setActiveActivity] = useState(storedActiveActivity);

  const handleStartActivity = (e) => {
    const description = activityDescriptionRef.current.value;

    if (description === "") return

    setActiveActivity({ id: uuidv4(), description: description, start: getCurrentTime(), end: "", duration: "" })

    activityDescriptionRef.current.value = null;
    console.log(React.version)
  }

  const stopActivity = () => {
    const activityToEnd = activeActivity;

    activityToEnd['end'] = getCurrentTime();

    const duration = new Date(activityToEnd.end).getTime() - new Date(activityToEnd.start).getTime();
    activeActivity['duration'] = duration;



    setActiveActivity(null);
    setActivities(prevActs => {
      return [activityToEnd, ...prevActs.slice(1)]
    })
  }

  useEffect(() => {
    if (activeActivity !== null && JSON.parse(window.sessionStorage.getItem("activeActivity")) === null) {
      setActivities(prevActs => {
        return [activeActivity, ...prevActs]
      })
    }

    window.sessionStorage.setItem("activeActivity", JSON.stringify(activeActivity));
  }, [activeActivity])

  useEffect(() => {
    window.sessionStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  const renderClockInOut = () => {
    return activeActivity === null ? (
      <div className=" m-3">
        <input ref={activityDescriptionRef} className=" main-input form-control mr-2" placeholder="Enter new activity description"></input>
        <Button onClick={handleStartActivity} className="startButton" variant="success mr-2 mt-2 w-100">Start</Button>
      </div>
    ) :
      (
        <div className=" m-3">
          <p>{activeActivity.description}</p>
          <Button onClick={stopActivity} className="endButton" variant="danger mt-2 w-100">Finish current task</Button>
        </div>
      )
  }

  const getCurrentTime = () => {
    return new Date();
  }

  return (
    <div className="App">

      <h3>Activity Tracker</h3>
      {renderClockInOut()}

      <ActivityHistory activities={activities} activeActivity={activeActivity} />
    </div>
  );
}

export default App;
