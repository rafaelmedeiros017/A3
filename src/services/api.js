// src/services/api.js
const API_URL = 'http://localhost:5000/api/cars';

export const fetchCars = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addCar = async (carData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });
  return await res.json();
};

export const deleteCar = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};
