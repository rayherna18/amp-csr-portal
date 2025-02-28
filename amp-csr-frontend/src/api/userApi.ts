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

export const addUserSubscription = async (id: string, newSubscription: VehicleSubscription) => {
    try {
        // First, get the current subscriptions (assuming we can get this data from an API)
        const userResponse = await api.get(`/users/${id}`);
        const currentSubscriptions = userResponse.data.VehicleSubscriptions || [];

        // Append the new subscription
        const updatedSubscriptions = [...currentSubscriptions, newSubscription];

        // Send the updated subscriptions list to the server
        const response = await api.put(`/users/${id}`, { VehicleSubscriptions: updatedSubscriptions });
        console.log("User subscriptions updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding subscription:", error);
        throw error;
    }
};