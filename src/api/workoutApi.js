const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/workouts`;

export async function getWorkouts() {
  const res = await fetch(API_BASE);
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

  return res.json();
}

export async function deleteWorkout(id) {
  await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
}
