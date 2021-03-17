import React, { useEffect, useState, useRef } from 'react';

export default function ActivityHistory({ activities, activeActivity }) {
    const [currentDuration, setCurrentDuration] = useState(0);
    const intervalRef = useRef(null);

    const formatDuration = (duration) => {

        let seconds = parseInt((duration / 1000) % 60)
        let minutes = parseInt((duration / (1000 * 60)) % 60)
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return `${hours} : ${minutes} : ${seconds}`
    }

    const formatTime = (date) => {
        if (date === "") return ""
        date = new Date(date)
        const hours = date.getHours()
        const minutes = date.getMinutes();

        return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`
    }

    useEffect(() => {
        if (intervalRef.current != null) clearInterval(intervalRef.current)
        const currentActivity = activeActivity
        if (currentActivity !== null && currentActivity !== undefined) {
            intervalRef.current = setInterval(() => {
                setCurrentDuration(new Date().getTime() - new Date(currentActivity.start).getTime())
            })
        }
    }, [activities])

    return (
        <div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {activities.map(act => {
                        return (
                            <tr key={act.id}>
                                <td>{formatTime(act.start)}</td>
                                <td>{formatTime(act.end)}</td>
                                <td>{act.end === "" ? formatDuration(currentDuration) : formatDuration(act.duration)}</td>
                                <td>{act.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>




    )
}