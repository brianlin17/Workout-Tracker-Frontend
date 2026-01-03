import { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import { getWorkouts } from "./api/workoutApi";
import "./App.css";
export default function App() {
  const [activeTab, setActiveTab] = useState("add");
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  async function refresh() {
    const data = await getWorkouts();
    setWorkouts(data);
  }

  function handleSelectWorkout(workout) {
    setSelectedWorkout(workout);
    setActiveTab("saved");
  }

  function clearSelection() {
    setSelectedWorkout(null);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="dashboard">
      <h1>Brian's Workout Tracker</h1>

      <div className="tabs">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => {
            setActiveTab("add");
            clearSelection();
          }}
        >
          Add Workout
        </button>

        <button
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved Workouts
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "add" && (
          <WorkoutForm
            refresh={refresh}
            clearSelection={clearSelection}
          />
        )}

        {activeTab === "saved" && (
          <>
            <WorkoutList
              workouts={workouts}
              selectedWorkout={selectedWorkout}
              onSelect={handleSelectWorkout}
            />

            {selectedWorkout && (
              <WorkoutForm
                selectedWorkout={selectedWorkout}
                refresh={refresh}
                clearSelection={() => setSelectedWorkout(null)}
                isEditing
              />
            )}
          </>
        )}

      </div>
    </div>
  );
}
