import { useEffect, useState } from "react";
import { getWorkouts } from "../api/workoutApi";

export default function WorkoutList({
  workouts,
  selectedWorkout,
  onSelect
}) {
  return (
    <div className="workout-list">
      <h2>Saved Workouts</h2>

      {workouts.length === 0 && (
        <p className="empty-workouts">
          No workouts saved yet.
        </p>
      )}

      {workouts.map(workout => (
        <div
          key={workout.id}
          onClick={() => onSelect(workout)}
          className={`workout-item ${
            selectedWorkout?.id === workout.id ? "selected" : ""
          }`}
        >
          <strong>{workout.name}</strong>
          <div className="workout-date">
            {workout.workoutDate}
          </div>
        </div>
      ))}
    </div>
  );
}
