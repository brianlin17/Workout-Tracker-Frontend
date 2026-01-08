import { useEffect, useState } from "react";
import { getWorkouts } from "../api/workoutApi";

export default function WorkoutList({
  workouts,
  selectedWorkout,
  onSelect
}) {
  return (
    <div
      style={{
        overflowY: "auto",
        height: "100%",
        paddingRight: "8px"
      }}
    >
      <h2>Saved Workouts</h2>

      {workouts.length === 0 && (
        <p style={{ opacity: 0.6 }}>
          No workouts saved yet.
        </p>
      )}

      {workouts.map(workout => (
        <div
          key={workout.id}
          onClick={() => onSelect(workout)}
          style={{
            border:
              selectedWorkout?.id === workout.id
                ? "2px solid #007bff"
                : "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            cursor: "pointer",
            borderRadius: "6px",
            background: "#fff"
          }}
        >
          <strong>{workout.name}</strong>
          <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            {workout.workoutDate}
          </div>
        </div>
      ))}
    </div>
  );
}

