// src/services/api.js
const API_URL_CARS = "http://localhost:5000/api/cars";
const API_URL_ROUPAS = "http://localhost:5000/api/roupas";

export const fetchCars = async () => {
    const res = await fetch(API_URL_CARS);
    return await res.json();
};

export const fetchRoupas = async () => {
    const res = await fetch(API_URL_ROUPAS);
    return await res.json();
};

export const addCar = async (carData) => {
    const res = await fetch(API_URL_CARS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
    });
    return await res.json();
};

export const addRoupa = async (roupaData) => {
    const res = await fetch(API_URL_ROUPAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roupaData),
    });
    return await res.json();
};

export const deleteCar = async (id) => {
    const res = await fetch(`${API_URL_CARS}/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

export const deleteRoupa = async (id) => {
    const res = await fetch(`${API_URL_ROUPAS}/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};
