import { apiFetch } from "./api";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/workouts`;

export async function getWorkouts() {
  const res = await apiFetch(API);
  return res.json();
}

export async function createWorkout(workout) {
  const res = await apiFetch(API, {
    method: "POST",
    body: JSON.stringify(workout),
  });
  return res.json();
}

export async function updateWorkout(id, workout) {
  const res = await apiFetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(workout),
  });
  return res.json();
}

export async function deleteWorkout(id) {
  await apiFetch(`${API}/${id}`, {
    method: "DELETE",
  });
}
