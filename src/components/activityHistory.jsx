import React from 'react';

export default function ActivityHistory({ activities, currentDuration }) {
    const formatLapse = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

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
                                <td>{act.start}</td>
                                <td>{act.end}</td>
                                <td>{formatLapse(act.end === "" ? currentDuration : act.duration)}</td>
                                <td>{act.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>




    )
}