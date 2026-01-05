const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/workouts`;

export async function getWorkouts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function createWorkout(workout) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  if (!res.ok) throw new Error("Failed to create workout");
  return res.json();
}

export async function updateWorkout(id, updatedWorkout) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWorkout),
  });
  if (!res.ok) throw new Error("Failed to update workout");
  return res.json();
}

export async function deleteWorkout(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete workout");
}
