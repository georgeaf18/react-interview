import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid';

import ActivityHistory from "./components/activityHistory";

function App() {
  const initialActivities = () => JSON.parse(window.sessionStorage.getItem("activities")) || []
  const [activities, setActivities] = useState(initialActivities);
  const activityDescriptionRef = useRef();
  const [activeActivity, setActiveActivity] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const intervalRef = useRef(null)

  const handleStartActivity = (e) => {
    const description = activityDescriptionRef.current.value;

    if (description === "") return

    intervalRef.current = setInterval(() => {
      setCurrentDuration((lapse) => lapse + 1)
    }, 1000)
    setActiveActivity({ id: uuidv4(), description: description, start: getCurrentTime(), end: "", duration: currentDuration })

    activityDescriptionRef.current.value = null;
  }

  const stopActivity = () => {
    const activityToEnd = activeActivity;

    activityToEnd['end'] = getCurrentTime();
    activeActivity['duration'] = currentDuration;

    clearInterval(intervalRef.current)
    setCurrentDuration(0)


    setActiveActivity(null);
    setActivities(prevActs => {
      return [activityToEnd, ...prevActs.slice(1)]
    })
  }

  useEffect(() => {
    if (activeActivity != null)
      setActivities(prevActs => {
        return [activeActivity, ...prevActs]
      })
  }, [activeActivity])

  useEffect(() => {
    window.sessionStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  const renderClockInOut = () => {
    return activeActivity === null ? (
      <div className=" m-3">
        <input ref={activityDescriptionRef} className="form-control mr-2" placeholder="Enter new activty"></input>
        <Button onClick={handleStartActivity} variant="success mr-2 mt-2 w-100">Start</Button>
      </div>
    ) :
      (
        <div className=" m-3">
          <p>{activeActivity.description}</p>
          <Button onClick={stopActivity} variant="danger mt-2 w-100">Finish current task</Button>
        </div>
      )
  }

  const getCurrentTime = () => {

    const hours = new Date().getHours()
    const minutes = new Date().getMinutes();

    return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`;
  }

  return (
    <div className="App">

      <h3>Activity Tracker</h3>
      {renderClockInOut()}

      <ActivityHistory activities={activities} currentDuration={currentDuration} />
    </div>
  );
}

export default App;
