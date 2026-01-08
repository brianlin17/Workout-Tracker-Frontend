import { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import Login from "./components/Login";
import { getWorkouts } from "./api/workoutApi";
import { isLoggedIn, logout } from "./utils/auth";
import "./App.css";

export default function App() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const [activeTab, setActiveTab] = useState("add");
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  async function refresh() {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      // Token expired / invalid → force logout
      console.error(err);
      logout();
      setAuthed(false);
    }
  }

  function handleSelectWorkout(workout) {
    setSelectedWorkout(workout);
    setActiveTab("saved");
  }

  function clearSelection() {
    setSelectedWorkout(null);
  }

  /* 🔐 Only load workouts AFTER auth */
  useEffect(() => {
    if (authed) {
      refresh();
    }
  }, [authed]);

  /* 🔐 AUTH WALL */
  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="dashboard">
      <h1>Brian's Workout Tracker</h1>

      <button
        style={{ marginBottom: "1rem" }}
        onClick={() => {
          logout();
          setAuthed(false);
        }}
      >
        Logout
      </button>

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
