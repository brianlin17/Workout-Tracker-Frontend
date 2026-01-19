import { useState, useEffect } from "react";
import {
  createWorkout,
  updateWorkout,
  deleteWorkout
} from "../api/workoutApi";


export default function WorkoutForm({
  selectedWorkout,
  refresh,
  clearSelection,
  isEditing = false
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([]);

  /* -------------------- helpers -------------------- */

  function resetForm() {
    setName("");
    setDate("");
    setExercises([]);
    clearSelection();
  }

  function addExercise() {
    setExercises([...exercises, { name: "", sets: [] }]);
  }

  function deleteExercise(exIdx) {
    setExercises(exercises.filter((_, i) => i !== exIdx));
  }

  function addSet(exIdx) {
    const copy = [...exercises];
    copy[exIdx].sets.push({ reps: 0, weight: 0 });
    setExercises(copy);
  }

  function deleteSet(exIdx, setIdx) {
    const copy = [...exercises];
    copy[exIdx].sets.splice(setIdx, 1);
    setExercises(copy);
  }

  /* -------------------- load selected workout -------------------- */

  useEffect(() => {
    if (!selectedWorkout) {
      resetForm();
      return;
    }

    setName(selectedWorkout.name);
    setDate(selectedWorkout.workoutDate);
    setExercises(
      selectedWorkout.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(s => ({ ...s }))
      }))
    );
  }, [selectedWorkout]);


  /* -------------------- submit -------------------- */

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      workoutDate: date,
      exercises
    };

if (isEditing && selectedWorkout) {
  await updateWorkout(selectedWorkout.id, payload);
} else {
  await createWorkout(payload);
}


    resetForm();
    clearSelection?.();
    await refresh();
  }


  async function handleDelete() {
    if (!selectedWorkout) return;

    await deleteWorkout(selectedWorkout.id);


    await refresh();
    resetForm();
  }

  /* -------------------- render -------------------- */

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Workout" : "Add Workout"}</h2>


<div className="form-row">
  <input
    type="text"
    placeholder="Workout Name"
    value={name}
    onChange={e => setName(e.target.value)}
  />
  <input
    type="date"
    value={date}
    onChange={e => setDate(e.target.value)}
  />
</div>


      <h3>Exercises</h3>

      {exercises.map((ex, exIdx) => (
        <div
          key={exIdx}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "6px"
          }}
        >
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <input
              placeholder="Exercise name"
              value={ex.name}
              onChange={e => {
                const copy = [...exercises];
                copy[exIdx].name = e.target.value;
                setExercises(copy);
              }}
              style={{ flex: 1 }}
            />

            <button
              type="button"
              onClick={() => deleteExercise(exIdx)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>

          <div className="sets-box">
            {ex.sets.map((set, setIdx) => (
              <div key={setIdx} className="set-row">
                <div className="set-label">Set {setIdx + 1}</div>

                <div className="set-input">
                  <label>Reps</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={set.reps === 0 ? "" : set.reps}
                    onChange={e => {
                      const raw = e.target.value;

                      if (raw === "") {
                        const copy = [...exercises];
                        copy[exIdx].sets[setIdx].reps = 0;
                        setExercises(copy);
                        return;
                      }

                      // Normalize number (removes leading zeros)
                      const value = Math.max(0, parseInt(raw, 10));

                      const copy = [...exercises];
                      copy[exIdx].sets[setIdx].reps = value;
                      setExercises(copy);
                    }}
                  />


                </div>

                <div className="set-input">
                  <label>Weight</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={set.weight === 0 ? "" : set.weight}
                    onChange={e => {
                      const raw = e.target.value;

                      if (raw === "") {
                        const copy = [...exercises];
                        copy[exIdx].sets[setIdx].weight = 0;
                        setExercises(copy);
                        return;
                      }

                      // Normalize number (removes leading zeros)
                      const value = Math.max(0, Number(raw));

                      const copy = [...exercises];
                      copy[exIdx].sets[setIdx].weight = value;
                      setExercises(copy);
                    }}
                  />


                </div>

                <button
                  type="button"
                  className="set-delete"
                  onClick={() => deleteSet(exIdx, setIdx)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>


          <button type="button" onClick={() => addSet(exIdx)}>
            + Add Set
          </button>
        </div>
      ))}

      <button type="button" onClick={addExercise}>
        + Add Exercise
      </button>

      <br /><br />

      <button type="submit">
        {selectedWorkout ? "Update Workout" : "Save Workout"}
      </button>

{/*         {isEditing && (
          <button
            type="button"
            onClick={clearSelection}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )} */}

      {selectedWorkout && (
        <>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              marginLeft: "10px",
              backgroundColor: "#dc3545",
              color: "white"
            }}
          >
            Delete
          </button>

          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
}
