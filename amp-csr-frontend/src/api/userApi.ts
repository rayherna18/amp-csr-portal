import { VehicleSubscription } from "../components/ViewUsers";
import api from "./axiosInstance";

export const fetchUsers = async () => {
    const response = await fetch('/users');
    const users = await response.json();
    return users;
};

export const createUser = async (user: object) => {
    const response = await api.post("/users", user);
    return response.data;
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}

export const updateUser = async (id: string, user: Partial<object>) => {
    const response = await api.put(`/users/${id}`, user);
    console.log("User updated:", response.data);
    return response.data;
}

export const updateUserSubscriptions = async (id: string, VehicleSubscriptions: Partial<object>) => {
    try {
        console.log("Updating user subscriptions:", VehicleSubscriptions);
        const response = await api.put(`/users/${id}`, { VehicleSubscriptions });
        console.log("User subscriptions updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user subscriptions:", error);
        throw error;
    }
};
