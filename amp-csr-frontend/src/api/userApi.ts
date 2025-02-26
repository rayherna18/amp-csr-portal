import api from "./axiosInstance";

export const fetchUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const createUser = async (user: object) => {
    const response = await api.post("/users", user);
    return response.data;
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}